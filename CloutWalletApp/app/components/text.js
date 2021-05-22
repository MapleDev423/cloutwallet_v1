import React from 'react';
import {Text} from 'react-native';
import * as dimensions from 'utils/dimensions';
import * as colors from 'utils/colors';

const Index = props => {
  const {
    children,
    color = colors.white,
    fontSize = dimensions.fontSizes.m,
    fontWeight,
    center,
  } = props;
  return (
    <Text
      style={{
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textAlign: center && 'center',
      }}>
      {children}
    </Text>
  );
};

export default Index;
