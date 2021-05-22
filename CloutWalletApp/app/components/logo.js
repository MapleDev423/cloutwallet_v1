import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from './text';
import * as strings from 'utils/strings';
import * as images from 'utils/images';
import * as dimensions from 'utils/dimensions';
import * as colors from 'utils/colors';

const Index = props => {
  const {size} = props;

  const logoImageSize = size === 'large' ? 45 : 30;

  return (
    <View style={styles.root}>
      <Image
        source={images.logo}
        tintColor={colors.white}
        style={{
          width: logoImageSize,
          height: logoImageSize,
        }}
      />
      <Text
        fontSize={
          size === 'large' ? dimensions.fontSizes.logo : dimensions.fontSizes.xl
        }>
        {strings.APP_NAME}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Index;
