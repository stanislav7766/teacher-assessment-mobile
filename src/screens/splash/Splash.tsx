/* eslint-disable global-require */
import React from 'react';
import {View, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {styles} from './styles';

interface SplashProps {
  navigator: EasyRouterNavigator;
}

const Splash = ({navigator}: SplashProps) => {
  const onHide = () => navigator.push('Main', {}, {animation: 'fade'});

  return (
    <View style={styles.wrap}>
      <LottieView onAnimationFinish={onHide} source={require('@assets/splash.json')} autoPlay loop={false} />
      <View style={styles.footer}>
        <Image style={styles.footerImage} source={require('@assets/footer.png')} />
      </View>
    </View>
  );
};

export default Splash;
