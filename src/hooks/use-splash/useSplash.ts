import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

const useSplash = (time: number) => {
  useEffect(() => {
    const splashTimer = setTimeout(() => SplashScreen.hide(), time);
    return () => {
      clearTimeout(splashTimer);
    };
  }, [time]);
};
export default useSplash;
