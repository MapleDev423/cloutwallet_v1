import React from 'react';

import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Text from './text';
import Space from './space';

import * as colors from 'utils/colors';

const Index = props => {
  const {imageSource, title, onPress, selected} = props;
  return (
    <TouchableOpacity
      style={[
        styles.root,
        {borderColor: selected ? colors.white : colors.lightGray},
      ]}
      onPress={onPress}>
      <Image
        style={styles.image}
        source={imageSource}
        tintColor={colors.white}
      />
      <Space width={10} />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
  },

  image: {
    width: 15,
    height: 15,
  },
});

export default Index;
