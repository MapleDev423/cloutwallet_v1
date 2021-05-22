import React from 'react';
import {Button} from 'react-native-paper';

const Index = props => {
  const {children = 'button', onPress = () => {}, disabled} = props;
  return (
    <Button mode="contained" onPress={onPress} disabled={disabled}>
      {children}
    </Button>
  );
};

export default Index;
