import React from 'react';

import {View, StyleSheet} from 'react-native';
import Text from './text';

import * as dimensions from 'utils/dimensions';

const Index = props => {
  const {text, title, borderColor} = props;
  return (
    <View style={[styles.root, {borderColor: borderColor}]}>
      <Text>{text}</Text>
      <Text center>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: (dimensions.screen.width - dimensions.screen.padding * 2 - 20) / 3,
    height: (dimensions.screen.width - dimensions.screen.padding * 2 - 20) / 3,
    // backgroundColor: colors.dark_secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
  },
});

export default Index;
