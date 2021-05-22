import React from 'react';
import {StyleSheet} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {Text} from 'components';
import * as colors from 'utils/colors';

const Loading = props => {
  const {source, text} = props;
  return (
    <AnimatedLoader
      visible={true}
      overlayColor={colors.dark_primary}
      animationStyle={styles.lottie}
      source={source}
      speed={1}>
      <Text>{text}</Text>
    </AnimatedLoader>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
});

export default Loading;
