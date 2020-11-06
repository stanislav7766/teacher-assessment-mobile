/* eslint-disable global-require */
import React from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';

const Logo = () => (
  <View style={styles.logo}>
    <Image style={styles.logoImage} source={require('@assets/logo.png')} />
  </View>
);
export default Logo;
