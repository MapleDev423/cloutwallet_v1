import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Logo,
  Space,
  Loading,
  TotalInfo,
  Tab,
  Card,
  Text,
  Button,
} from 'components';
import {Modal} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import LottieView from 'lottie-react-native';

import {AndroidBackHandler} from 'react-navigation-backhandler';
import {BackHandler} from 'react-native';

import {UserAPI} from 'api';

import {nanosToBitClout, decimalRandom, USDValueFrom} from 'utils/helpers';

import firestore from '@react-native-firebase/firestore';

import * as strings from 'utils/strings';
import * as colors from 'utils/colors';
import * as dimensions from 'utils/dimensions';
import * as images from 'utils/images';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [loadingState, setLoadingState] = React.useState(true);
  const {token, bitCloutPrice, userName} = props.auth.user;
  const [users, setUsers] = React.useState([]);
  const [balance, setBalance] = React.useState(0);
  const [oldUserWallet, setOldUserWallet] = React.useState({});
  const [percentState, setPercentState] = React.useState();
  const [profileModalVisible, setProfileModalVisible] = React.useState(false);
  const [chartModalVisible, setChartModalVisible] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const [loadingHistoryState, setLoadingHistoryState] = React.useState(false);
  const [priceList, setPriceList] = React.useState([1, 2, 3, 4, 5, 6, 7]);
  const [timeList, setTimeList] = React.useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
  ]);

  React.useEffect(() => {
    getData();
  }, [props.navigation]);

  const getData = async () => {
    setLoadingState(true);
    await getCreatorCoins();
    await getPercentData();
    setLoadingState(false);
  };

  const getCreatorCoins = async () => {
    await UserAPI.getCreatorCoins(token)
      .then(response => {
        console.log('response_getCreatorCoinsAPI', response.data);

        setBalance(nanosToBitClout(response.data.data.balance));

        setUsers(
          response.data.data.holdings
            .slice()
            .sort((a, b) =>
              a.BalanceNanos * a.ProfileEntryResponse.CoinPriceBitCloutNanos <
              b.BalanceNanos * b.ProfileEntryResponse.CoinPriceBitCloutNanos
                ? 1
                : -1,
            ),
        );

        setProfile(response.data.data.user);
      })
      .catch(error => {
        console.log('error_getCreatorCoinsAPI', error);
      });
  };

  const getPercentData = async () => {
    let agoTime = 24 * 3600 * 1000;
    let rangTime = 3 * 60 * 1000;
    let starttime = Date.now() - agoTime; // 35 * 60 * 1000;

    const dbresponse = firestore()
      .collection('log')
      .where('time', '<', starttime + rangTime)
      .where('time', '>', starttime - rangTime)
      .where('username', '==', userName.toLowerCase());

    const data = await dbresponse.get();

    let logdata = [];

    data.docs.forEach(item => {
      let newItem = {
        ...item.data(),
      };
      logdata = [newItem, ...logdata];
    });

    // console.log('logdata', logdata);

    let newPercents = [];
    logdata.map(log => {
      let existStates = newPercents.filter(newpercent => {
        return (
          newpercent.creatorCoinsUsername.toLowerCase() ===
          log.creatorCoinsUsername.toLowerCase()
        );
      });
      if (existStates.length === 0) {
        newPercents = [log, ...newPercents];
      }
    });

    setPercentState(newPercents);

    let cDate = new Date(Date.now());
    let amtime =
      Date.now() -
      (cDate.getHours() * 3600 + cDate.getMinutes() * 60 + cDate.getSeconds()) *
        1000;

    const dbuserWalletResponse = firestore()
      .collection('userwallet')
      .where('username', '==', userName.toLowerCase())
      .where('timestamp', '>=', amtime - 60000)
      .where('timestamp', '<', amtime + 60000);

    const userWalletData = await dbuserWalletResponse.get();

    let userWallet = [];
    userWalletData.docs.forEach(item => {
      let newItem = {
        ...item.data(),
      };
      userWallet = [newItem, ...userWallet];
    });

    if (userWallet.length !== 0) {
      setOldUserWallet(userWallet[0]);
    }
  };

  const getHistoryUserData = async selectedUserName => {
    setLoadingHistoryState(true);
    await UserAPI.getHistory(selectedUserName)
      .then(response => {
        let data = response.data;
        let logs = data.logs;
        let timelisttemp = [];
        let pricelisttemp = [];
        let transactionlist = [];
        let circulation = 0;
        //console.log(logs)
        for (let i = 0; i < logs.length; i++) {
          circulation += logs[i].coins;
          transactionlist[i] = {
            timestamp: logs[i].timestamp * 1000,
            price: bitCloutPrice * 0.003 * circulation * circulation,
          };
        }

        let starttime = transactionlist[0].timestamp;
        let endtime = transactionlist[transactionlist.length - 1].timestamp;
        let diff = 3600 * 12 * 1000;
        let index = 0;
        for (let i = starttime; i < endtime; i += diff) {
          let closetIndex = getClosetTransaction(i, transactionlist);
          if (closetIndex === -1) {
            pricelisttemp[index] = transactionlist[0].price;
          } else {
            pricelisttemp[index] = transactionlist[closetIndex].price;
          }
          timelisttemp[index] = getDate(i);
          index++;
        }

        console.log('transactionList', transactionlist);
        console.log('priceList', pricelisttemp);
        console.log('timeList', timelisttemp);
        setPriceList(pricelisttemp);
        setTimeList(timelisttemp);
      })
      .catch(error => {});

    setLoadingHistoryState(false);
  };

  const getClosetTransaction = (ts, transactions) => {
    for (let i = 0; i < transactions.length; i++) {
      if (ts < transactions[i].timestamp) {
        return i;
      }
    }
    return -1;
  };

  const getDate = t => {
    let dt = new Date(t);
    return dt.toString().substring(4, 10);
  };

  const getPercentChange = (username, currentval) => {
    if (percentState && percentState.length !== 0) {
      let percentItem = percentState.filter(item => {
        return (
          item.creatorCoinsUsername.toLowerCase() === username.toLowerCase()
        );
      });
      if (percentItem.length !== 0) {
        return decimalRandom((currentval / percentItem[0].USD) * 100 - 100);
      } else {
        return 0;
      }
    }
    return 0;
  };

  const totalPrice = users
    .map(item => {
      const coinsInCir = nanosToBitClout(
        item.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos,
      );

      const _balance = nanosToBitClout(item.BalanceNanos);

      return USDValueFrom(bitCloutPrice, coinsInCir, _balance);
    })
    .reduce((value, item) => {
      return value + item;
    }, 0);

  const balanceUSD = balance * bitCloutPrice;

  const totalPriceHeld = totalPrice + balanceUSD;

  const getTotalPercent = () => {
    if (oldUserWallet.hasOwnProperty('USD')) {
      return (totalPrice / oldUserWallet.USD) * 100 - 100;
    } else {
      return 0;
    }
  };

  const onButtonLogout = () => {
    props.authActions.signOut();
    props.navigation.navigate('AuthenticationScreen');
    setProfileModalVisible(false);
  };

  // const totalCoinsHeld = users
  //   .map(item => {
  //     return nanosToBitClout(item.BalanceNanos);
  //   })
  //   .reduce((value, item) => {
  //     return value + item;
  //   }, 0);

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#000000',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#000000',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    fillShadowGradientOpacity: 0.3,
  };

  return (
    <AndroidBackHandler
      onBackPress={() => {
        BackHandler.exitApp();
        return true;
      }}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Logo size="small" />

          <TouchableOpacity
            onPress={() => {
              setProfileModalVisible(true);
            }}>
            <Image
              source={profile ? {uri: profile.ProfilePic} : images.profile}
              style={styles.buttonProfile}
            />
          </TouchableOpacity>
        </View>

        <Space height={10} />

        <View style={styles.topView}>
          <TotalInfo
            text={`$ ${decimalRandom(totalPriceHeld).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            title="Total Price Held"
            borderColor={'#FF9A00'}
          />

          <TotalInfo
            text={`${decimalRandom(getTotalPercent())}%`}
            title="Gain / Loss"
            borderColor={'#BEFF00'}
          />

          <TotalInfo
            text={`$ ${decimalRandom(balanceUSD).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            title="Amount"
            borderColor={'#0096FF'}
          />
        </View>

        <Space height={10} />

        <View stlye={styles.bottomView}>
          <View style={styles.tab}>
            <Tab
              imageSource={images.usd}
              title={strings.dashboardScreen.tab_1}
              onPress={() => {
                setTabIndex(0);
                setUsers(
                  users.sort((a, b) =>
                    a.BalanceNanos *
                      a.ProfileEntryResponse.CoinPriceBitCloutNanos <
                    b.BalanceNanos *
                      b.ProfileEntryResponse.CoinPriceBitCloutNanos
                      ? 1
                      : -1,
                  ),
                );
              }}
              selected={tabIndex === 0}
            />

            <Space width={10} />

            <Tab
              imageSource={images.coin}
              title={strings.dashboardScreen.tab_2}
              onPress={() => {
                setTabIndex(1);
                setUsers(
                  users.sort((a, b) =>
                    a.BalanceNanos < b.BalanceNanos ? 1 : -1,
                  ),
                );
              }}
              selected={tabIndex === 1}
            />
          </View>

          <Space height={10} />

          <FlatList
            ListFooterComponent={<View />}
            ListFooterComponentStyle={styles.flatListFooterComponent}
            data={users}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              const _coin = nanosToBitClout(item.BalanceNanos);

              const _coinPrice =
                nanosToBitClout(
                  item.ProfileEntryResponse.CoinPriceBitCloutNanos,
                ) * bitCloutPrice;

              const coinsInCirculation = nanosToBitClout(
                item.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos,
              );

              const _usd = USDValueFrom(
                bitCloutPrice,
                coinsInCirculation,
                _coin,
              );

              const _supplyHeldPercent = (_coin / coinsInCirculation) * 100;

              const _portfolio = (_usd / totalPrice) * 100;

              const _percentChange = getPercentChange(
                item.ProfileEntryResponse.Username,
                decimalRandom(_coinPrice),
              );

              return (
                <Card
                  userName={item.ProfileEntryResponse.Username}
                  imageSource={item.ProfileEntryResponse.ProfilePic}
                  usdValue={decimalRandom(_usd).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  coinValue={decimalRandom(_coin)}
                  tabIndex={tabIndex}
                  onPress={() => {
                    getHistoryUserData(item.ProfileEntryResponse.Username);
                    setChartModalVisible(true);
                    setSelectedUser({
                      ...item,
                      usdValue: decimalRandom(_usd).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                      coinValue: decimalRandom(_coin),
                      supplyHeldPercent: decimalRandom(_supplyHeldPercent),
                      coinPrice: decimalRandom(_coinPrice),
                      portfolio: decimalRandom(_portfolio),
                      percentChange: decimalRandom(_percentChange),
                    });
                  }}
                />
              );
            }}
          />
        </View>

        {loadingState && (
          <Loading
            source={require('assets/animations/loading.json')}
            text="Loading..."
          />
        )}
        <Modal
          visible={profileModalVisible}
          onDismiss={() => {
            setProfileModalVisible(false);
          }}
          contentContainerStyle={styles.modalContainer}>
          <Image
            source={profile ? {uri: profile.ProfilePic} : images.avatar}
            style={styles.profileImage}
          />

          <Space height={10} />

          <Text center fontSize={dimensions.fontSizes.l}>
            {profile ? profile.Username : ''}
          </Text>

          <Space height={20} />

          <Text>{profile ? profile.Description.replace(/\//g, '') : ''}</Text>

          <Space height={20} />

          <Button onPress={onButtonLogout}>Logout</Button>
        </Modal>

        <Modal
          visible={chartModalVisible}
          onDismiss={() => {
            setChartModalVisible(false);
          }}
          contentContainerStyle={styles.modalContainer}>
          <View style={styles.chartModalHeader}>
            <Image
              source={
                selectedUser
                  ? {uri: selectedUser.ProfileEntryResponse.ProfilePic}
                  : images.avatar
              }
              style={styles.chartModalProfileImage}
            />
            <Text center fontSize={dimensions.fontSizes.l}>
              {selectedUser ? selectedUser.ProfileEntryResponse.Username : ''}
            </Text>
          </View>

          <Space height={15} />

          {loadingHistoryState ? (
            <LottieView
              source={require('assets/animations/loading.json')}
              autoPlay
              loop
              style={styles.chartAnimationView}
            />
          ) : (
            <LineChart
              data={{
                labels: timeList.filter(
                  (element, index) => index > timeList.length - 6,
                ),
                datasets: [
                  {
                    data: priceList.filter(
                      (element, index) => index > timeList.length - 6,
                    ),
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    strokeWidth: 2, // optional
                  },
                ],
              }}
              width={
                dimensions.screen.width * 0.7 - dimensions.screen.padding * 2
              }
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
              yAxisLabel="$"
            />
          )}

          <Space height={15} />

          <View style={styles.chartModalDetailInfoGroup}>
            <View style={styles.chartModalDetailInfo}>
              <Text fontSize={dimensions.fontSizes.s}>USD value</Text>
              <Space width={5} />
              <Text fontSize={dimensions.fontSizes.s} color={colors.green}>
                $ {selectedUser ? selectedUser.usdValue : ''}
              </Text>
            </View>
            <View style={styles.chartModalDetailInfo}>
              <Text fontSize={dimensions.fontSizes.s}>Coin value</Text>
              <Space width={5} />
              <Text fontSize={dimensions.fontSizes.s} color={colors.green}>
                {selectedUser ? selectedUser.coinValue : ''}
              </Text>
            </View>
          </View>

          <Space height={15} />

          <View style={styles.chartModalDetailInfoGroup}>
            <View style={styles.chartModalDetailInfo}>
              <Text fontSize={dimensions.fontSizes.s}>Supply Held</Text>
              <Space width={5} />
              <Text fontSize={dimensions.fontSizes.s} color={colors.green}>
                {selectedUser ? selectedUser.supplyHeldPercent : '0'}%
              </Text>
            </View>
            <View style={styles.chartModalDetailInfo}>
              <Text fontSize={dimensions.fontSizes.s}>Coin Price</Text>
              <Space width={5} />
              <Text fontSize={dimensions.fontSizes.s} color={colors.green}>
                $ {selectedUser ? selectedUser.coinPrice : '0'}
              </Text>
            </View>
          </View>

          <Space height={15} />

          <View style={styles.chartModalDetailInfoGroup}>
            <View style={styles.chartModalDetailInfo}>
              <Text fontSize={dimensions.fontSizes.s}>Portfolio</Text>
              <Space width={5} />
              <Text fontSize={dimensions.fontSizes.s} color={colors.green}>
                {selectedUser ? selectedUser.portfolio : '0'}%
              </Text>
            </View>
            <View style={styles.chartModalDetailInfo}>
              <Text fontSize={dimensions.fontSizes.s}>24hr Gain/Loss</Text>
              <Space width={5} />
              <Text fontSize={dimensions.fontSizes.s} color={colors.green}>
                {selectedUser ? selectedUser.percentChange : '0'}%
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </AndroidBackHandler>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.dark_primary,
    flex: 1,
    padding: dimensions.screen.padding,
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonProfile: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  modalContainer: {
    width: '70%',
    backgroundColor: colors.dark_secondary,
    alignSelf: 'center',
    padding: dimensions.screen.padding,
    borderRadius: 15,
  },

  chartModalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: 'center',
  },

  chartModalProfileImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  chartModalDetailInfoGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  chartModalDetailInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  chartAnimationView: {
    width: dimensions.screen.width * 0.7 - dimensions.screen.padding * 2,
    // height: 256,
    // backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flatListFooterComponent: {
    height: 250,
  },
});

const mapStateToProps = state => {
  return {auth: state.auth};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
