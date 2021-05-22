import React from 'react';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Text from './text';
import Space from './space';

import * as colors from 'utils/colors';
import * as images from 'utils/images';

const Index = props => {
  const {imageSource, userName, tabIndex, usdValue, coinValue, onPress} = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <ImageBackground
        source={images.profile}
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <Image source={{uri: imageSource}} style={styles.image} />
      </ImageBackground>
      <Space width={10} />
      <Text>{userName}</Text>
      <Space flex={1} />
      {tabIndex === 0 && <Text>{`$ ${usdValue}`}</Text>}
      {tabIndex === 1 && <Text>{coinValue}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.dark_secondary,
    marginBottom: 10,
    padding: 10,
  },

  image: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },

  imageStyle: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
});

export default Index;
