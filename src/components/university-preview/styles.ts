import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';
import {ACCENT_COLOR_BLUE} from '@constants/colors';

type Styles = {
  preview: ImageStyle;
  container: ViewStyle;
  name: TextStyle;
  mask: ViewStyle;
};

type IDefaultPreviewSize = {width: '100%'; height: number};
export const defaultPreviewSize: IDefaultPreviewSize = {width: '100%', height: 70};

export const styles = StyleSheet.create<Styles>({
  preview: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: ACCENT_COLOR_BLUE,
    width: '100%',
    minHeight: defaultPreviewSize.height,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: defaultPreviewSize.height,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 19,
    color: 'white',
    position: 'absolute',
    zIndex: 2,
    padding: 10,
    width: '100%',
    textAlign: 'center',
  },
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: ACCENT_COLOR_BLUE,
    opacity: 0.35,
    zIndex: 1,
    borderRadius: 15,
  },
});
