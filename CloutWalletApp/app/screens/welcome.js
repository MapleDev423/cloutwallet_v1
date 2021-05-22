import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Logo, Text, Button, Space} from 'components';
import * as strings from 'utils/strings';
import * as colors from 'utils/colors';

const Index = props => {
  const onButtonGetStarted = () => {
    props.navigation.navigate('AuthenticationScreen');
  };

  return (
    <View style={styles.root}>
      <View style={styles.childView}>
        <Logo size="large" />
        <Space height={20} />
        <Text center>{strings.welcomeScreen.paragraph_1}</Text>
      </View>
      <View style={styles.childView}>
        <Text center>{strings.welcomeScreen.paragraph_2}</Text>
        <Space height={20} />
        <Button onPress={onButtonGetStarted}>
          {strings.welcomeScreen.button}
        </Button>
      </View>
    </View>
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
});

export default Index;
