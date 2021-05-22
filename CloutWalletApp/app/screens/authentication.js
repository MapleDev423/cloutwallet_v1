import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Logo,
  Text,
  Button,
  Space,
  Input,
  Loading,
  DismissKeyboard,
} from 'components';
import * as strings from 'utils/strings';
import * as colors from 'utils/colors';

import {AuthAPI} from 'api';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const [userName, setUserName] = React.useState('');
  const [inputError, setInputError] = React.useState(false);
  const [loadingState, setLoadingState] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const onButtonSignIn = () => {
    if (userName === '') {
      setInputError(true);
    } else {
      signIn();
    }
  };

  const signIn = async () => {
    setLoadingState(true);
    await AuthAPI.signIn(userName)
      .then(async response => {
        console.log('response_signInAPI', response.data);
        const {success} = response.data;

        if (success === true) {
          setErrorMessage('');
          const token = response.data.data.profile.PublicKeyBase58Check;
          const bitCloutPrice = response.data.data.BitClout_price;

          props.authActions.signIn({
            token: token,
            bitCloutPrice: bitCloutPrice,
            userName: userName,
          });

          setUserName('');
          await props.navigation.navigate('DashboardScreen');
        } else {
          setErrorMessage(response.data.error);
        }
      })
      .catch(error => {
        console.log('error_signInAPI', error.status, error.data.error);

        if (error.status === 404) {
          setErrorMessage(error.data.error);
        } else {
          setErrorMessage('Network Error');
        }
      });
    setLoadingState(false);
  };

  return (
    <DismissKeyboard>
      <View style={styles.root}>
        <View style={styles.childView}>
          <Logo size="large" />

          <Space height={20} />

          <Text center>{strings.authenticationScreen.paragraph_1}</Text>

          <Space height={20} />

          <View style={styles.inputView}>
            <Input
              placeholder={strings.authenticationScreen.inputTitle}
              text={userName}
              error={inputError}
              onChangeText={text => {
                setInputError(false);
                setUserName(text);
              }}
            />
          </View>

          <Space height={20} />

          <Text color={colors.warning}>{errorMessage}</Text>
        </View>
        <View style={styles.childView}>
          <Button onPress={onButtonSignIn}>
            {strings.authenticationScreen.button}
          </Button>
        </View>

        {loadingState && (
          <Loading
            source={require('assets/animations/authenticating.json')}
            text="Authenticating..."
          />
        )}
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.dark_primary,
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  childView: {
    width: '75%',
    alignItems: 'center',
  },

  inputView: {
    width: '100%',
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
