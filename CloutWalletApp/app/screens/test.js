import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Logo} from 'components';

const Index = props => {
  return (
    <View style={styles.root}>
      <Logo />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default Index;
