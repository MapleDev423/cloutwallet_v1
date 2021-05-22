import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TestScreen from 'screens/test';
import WelcomeScreen from 'screens/welcome';
import AuthenticationScreen from 'screens/authentication';
import DashboardScreen from 'screens/dashboard';

import * as dimensions from 'utils/dimensions';
import * as colors from 'utils/colors';
import * as images from 'utils/images';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Navigation = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          props.auth.isAuth ? 'DashboardScreen' : 'WelcomeScreen'
        }>
        <Stack.Screen
          name="TestScreen"
          component={TestScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="AuthenticationScreen"
          component={AuthenticationScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {auth: state.auth};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
