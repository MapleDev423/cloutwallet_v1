import LineChart from "../../molecule/LineChart/lineChart.component";
import BuyHistory from "../Dashboard/BuyHistory/buyHistory.component";
import SellHistory from "../Dashboard/SellHistory/sellHistory.component";
import { Style } from "./marketOverview.styles";
import fetch from "isomorphic-unfetch";
import debounce from "lodash.debounce";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useQuery, useLazyQuery } from "@apollo/client";

import { GET_USER_TRANSACTIONS } from "../../../graphql/UserTransaction-graphql";

function MarketOverview({ getKey, holdingData, trandata }) {
  console.log(trandata);
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [searchProfiles, setSearchProfiles] = useState([]);
  const [getUserTransaction, { loading, data }] = useLazyQuery(
    GET_USER_TRANSACTIONS
  );
  const [timelist, setTimeList] = useState([]);
  const [pricelist, setPriceList] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState([]);
  const [searchedProfilePic, setSearchedProfilePic] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [currentPubKey, setCurrentPubKey] = useState("");
  const [tdata, setTdata] = useState(undefined);

  const abortController = useRef();

  const abortLatest = () => {
    abortController.current && abortController.current.abort();
  };

  const searchUsernames = async function (searchuser) {
    if (searchuser.length > 0) {
      const controller = new window.AbortController();
      abortController.current = controller;

      setSearchIsLoading(true);
      const response = await fetch(`/api/searchuser/${searchuser}`, {
        method: "POST",
        signal: controller.signal,
      });

      const profiles = await response.json();
      if (profiles.data) {
        // console.log(profiles.data.profile);
        setSearchProfiles(profiles.data.profile);
        setSearchIsLoading(false);
      } else {
        setSearchProfiles([]);
        setSearchIsLoading(true);
      }
    } else {
      // console.log("nada");
      setSearchProfiles([]);
      setSearchIsLoading(true);
    }
  };

  const debouncedSearch = useRef(debounce(searchUsernames, 700));

  const getThrottledResult = (e) => {
    abortLatest();
    debouncedSearch.current(e.target.value);
  };

  useEffect(async () => {
    //console.log("111tranData:",trandata)
    if (trandata !== undefined) {
      let trantemp = [...trandata.user_check];
      let logs = [];
      let prvlocked = 0;
      let prvcirculation = 0;
      for (let i = 0; i < trantemp.length; i++) {
        let locked = 0;
        let circulation = 0;
        if (trantemp[i].transactiontype == 0) {
          let templock =
            (trantemp[i].BitCloutToSellNanos / 1000000000) * 0.9999;
          templock = Math.floor(templock * 1000000000) / 1000000000;
          locked = prvlocked + templock;
          circulation = Math.pow(locked, 0.33333333333333333) * 10;
        } else {
          let coins =
            Math.ceil(trantemp[i].CreatorCoinToSellNanos) / 1000000000;
          circulation = prvcirculation - coins;
          locked = Math.pow(circulation, 3) / 1000;
        }
        let d = new Date(trantemp[i].timestamp * 1000);

        const response = await fetch(
          `/api/profile/pub/${trantemp[i].transactorpublickey}`,
          {
            method: "POST",
          }
        );

        const res_profile = await response.json();
        let username = trantemp[i].transactorpublickey;
        let pic = "";
        if (res_profile?.data?.Username) {
          username = res_profile?.data?.Username;
        }
        if (res_profile?.data?.ProfilePic) {
          pic = res_profile?.data?.ProfilePic;
        }
        logs = [
          ...logs,
          {
            locked: locked,
            circulation: circulation,
            coins: circulation - prvcirculation,
            date: d.toDateString(),
            username: username,
            userpic: pic,
            ...trantemp[i],
          },
        ];
        prvlocked = locked;
        prvcirculation = circulation;
        if((i + 1) % 30 == 0)
        {
          await new Promise((resolve) => setTimeout(resolve, 10000));
        }
      }
      console.log("newTran:", {
        user_check: logs,
        ExchangeRate: trandata.ExchangeRate,
      });
      setTdata({
        user_check: logs,
        ExchangeRate: trandata.ExchangeRate,
      });
    }
  }, [trandata]);

  useEffect(() => {
    document.getElementById("userSearchBar").addEventListener("focusin", () => {
      setSearchProfiles([]);
      setSearchIsLoading(true);
    });
  }, []);
  const getClosetTransaction = (ts, transactions) => {
    for (let i = 0; i < transactions.length; i++) {
      if (ts < transactions[i].timestamp) {
        return i;
      }
    }
    return -1;
  };
  const getPriceChange = (ts1, ts2, transactions) => {
    let t1index = getClosetTransaction(ts1, transactions);
    let t2index = getClosetTransaction(ts2, transactions);

    if (t1index != -1 && t1index != 0 && t2index != -1 && t2index != 0) {
      let tran1 = transactions[t1index - 1];
      let tran2 = transactions[t2index - 1];
      return tran2.price / tran1.price;
    } else {
      return 1;
    }
  };
  const getDate = (t) => {
    let dt = new Date(t);
    return dt.toString().substring(4, 10);
  };

  useEffect(() => {
    if (currentPubKey != "") {
      getUserTransaction({
        variables: {
          userpublickey: currentPubKey,
        },
      });
    }
  }, [currentPubKey]);

  useEffect(() => {
    if (
      data?.user_transaction &&
      data?.user_transaction.length != 0 &&
      data?.ExchangeRate
    ) {
      let bitCloutPrice = data.ExchangeRate.BitCloutUSDValue;

      let trantemp = data.user_transaction;
      let logs = [];
      let prvlocked = 0;
      let prvcirculation = 0;
      for (let i = 0; i < trantemp.length; i++) {
        let locked = 0;
        let circulation = 0;
        if (trantemp[i].transactiontype == 0) {
          let templock =
            (trantemp[i].BitCloutToSellNanos / 1000000000) * 0.9999;
          templock = Math.floor(templock * 1000000000) / 1000000000;
          locked = prvlocked + templock;
          circulation = Math.pow(locked, 0.33333333333333333) * 10;
        } else {
          let coins =
            Math.ceil(trantemp[i].CreatorCoinToSellNanos) / 1000000000;
          circulation = prvcirculation - coins;
          locked = Math.pow(circulation, 3) / 1000;
        }
        logs = [
          ...logs,
          {
            locked: locked,
            circulation: circulation,
            coins: circulation - prvcirculation,
            timestamp: trantemp[i].timestamp,
          },
        ];
        prvlocked = locked;
        prvcirculation = circulation;
      }

      let timelisttemp = [];
      let pricelisttemp = [];
      let transactionlist = [];
      let circulation = 0;
      for (let i = 0; i < logs.length; i++) {
        circulation += logs[i].coins;
        transactionlist[i] = {
          timestamp: logs[i].timestamp * 1000,
          price: bitCloutPrice * 0.003 * circulation * circulation,
        };
      }
      //console.log(transactionlist)
      let starttime = transactionlist[0].timestamp;
      let endtime = transactionlist[transactionlist.length - 1].timestamp;
      let t = 1;
      let diff = 3600 * 12 * 1000;
      let index = 0;
      for (let i = starttime; i < endtime; i += diff) {
        let change = getPriceChange(i, i + diff, transactionlist);
        let closetIndex = getClosetTransaction(i, transactionlist);
        if (closetIndex == -1) {
          pricelisttemp[index] = transactionlist[0].price;
        } else {
          pricelisttemp[index] = transactionlist[closetIndex].price;
        }

        timelisttemp[index] = getDate(i);
        index++;
      }

      setPriceList(pricelisttemp);
      setTimeList(timelisttemp);
      console.log("timelist is ", timelist);
      console.log("procelist is ", pricelist);
    } else {
      console.log(" there are none user transcation");
      setPriceList([]);
      setTimeList([]);
    }
  }, [data]);
  const onUpdateChart = (publicKey) => {
    getKey(publicKey);
    console.log(publicKey);
    setCurrentPubKey(publicKey);
  };

  let chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          borderDash: [1, 12],
          color: "#63666A",
        },
      },
      y: {
        ticks: { beginAtZero: true },
        grid: {
          borderDash: [4, 4],
          color: "transparent",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  return (
    <Style.Container dark={darkTheme}>
      <h1 className="mo-title">Market Overview</h1>
      <div className="mo-button">
        {!editMode && (
          <img
            src={searchedProfilePic}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "20px",
              marginRight: "18px",
            }}
          />
        )}

        <input
          className="ch-search-input"
          id="userSearchBar"
          value={searchBarValue}
          onChange={(e) => {
            setEditMode(true);
            getThrottledResult(e);
            setSearchBarValue(e.target.value);
          }}
          placeholder="Select Creator Coin"
        />

        {searchProfiles.length > 0 && (
          <div
            className="search_user_list"
            id="searchUserList"
            style={{ zIndex: 2, opacity: "100%" }}
          >
            {searchProfiles.map((profile) => {
              return (
                <div
                  className="user"
                  onClick={() => {
                    console.log("user item click!");
                    console.log("userProfile", profile);
                    setSearchBarValue(profile.Username);
                    setSearchProfiles([]);
                    setSearchIsLoading(false);
                    console.log(
                      "profile.PublicKeyBase58Check",
                      profile.PublicKeyBase58Check
                    );
                    onUpdateChart(profile.PublicKeyBase58Check);
                    setSearchedProfilePic(profile.ProfilePic);
                    setEditMode(false);
                  }}
                >
                  <img src={profile.ProfilePic} width="40" height="40" />
                  <p>{profile.Username}</p>
                </div>
              );
            })}
          </div>
        )}

        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.70711 0.292893C10.0676 0.653377 10.0953 1.22061 9.7903 1.6129L9.70711 1.70711L5.70711 5.70711C5.34662 6.06759 4.77939 6.09532 4.3871 5.7903L4.29289 5.70711L0.292893 1.70711C-0.0976305 1.31658 -0.0976305 0.683418 0.292893 0.292893C0.653378 -0.0675907 1.22061 -0.0953203 1.6129 0.209705L1.70711 0.292893L5 3.585L8.29289 0.292893C8.65338 -0.0675907 9.22061 -0.0953203 9.6129 0.209705L9.70711 0.292893Z"
            fill={darkTheme ? "white" : "#0A1629"}
          />
        </svg>
      </div>
      <div className="mo-line-chart">
        <h2 className="subtitle">Creators</h2>
        <div className="mo-creators">
          {holdingData !== undefined
            ? holdingData.slice(0, 8).map((item) => (
                <img
                  src={item.ProfileEntryResponse.ProfilePic}
                  alt={item.ProfileEntryResponse.Username}
                  onClick={() => {
                    onUpdateChart(
                      item.ProfileEntryResponse.PublicKeyBase58Check
                    );
                  }}
                />
              ))
            : ""}
        </div>
        <div className="mot-chart-size">
          <LineChart label={timelist} data={pricelist} options={chartOptions} />
        </div>
      </div>
      {trandata ? (
        <div className="buy-sell-history">
          <BuyHistory transactionData={tdata} dark={darkTheme} />
          <SellHistory transactionData={tdata} dark={darkTheme} />
        </div>
      ) : (
        <p className="no-t-h">You have no transaction history</p>
      )}
    </Style.Container>
  );
}

export default MarketOverview;
