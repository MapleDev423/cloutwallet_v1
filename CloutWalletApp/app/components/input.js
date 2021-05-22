import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import * as colors from 'utils/colors';

const Index = props => {
  const {placeholder, error, text, onChangeText} = props;
  const [borderColor, setBorderColor] = React.useState(colors.lightGray);
  return (
    <TextInput
      value={text}
      onChangeText={onChangeText}
      style={[styles.root, {borderColor: error ? colors.warning : borderColor}]}
      onFocus={() => setBorderColor(colors.white)}
      onBlur={() => setBorderColor(colors.lightGray)}
      placeholder={placeholder}
      placeholderTextColor={colors.lightGray}
      selectionColor={colors.white}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    textAlign: 'center',
    color: colors.white,
  },
});

export default Index;
