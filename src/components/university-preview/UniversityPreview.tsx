import React, {useState, memo} from 'react';
import {Image, View, Text, LayoutChangeEvent} from 'react-native';
import {styles, defaultPreviewSize} from './styles';

declare interface IUniversityPreviewProps {
  preview: string;
  name: string;
  size?: {width: number | '100%'; height: number};
}

const UniversityPreview = ({preview, name, size}: IUniversityPreviewProps) => {
  const [heightName, setHeight] = useState<number>(defaultPreviewSize.height);
  const isExtendable = size && heightName > size?.height;
  const onLayoutH = (e: LayoutChangeEvent): void => {
    setHeight(e.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mask} />
      <Image
        style={[styles.preview, {width: size?.width, height: isExtendable ? heightName : size?.height}]}
        source={{uri: preview}}
      />
      <Text onLayout={onLayoutH} style={styles.name}>
        {name}
      </Text>
    </View>
  );
};
UniversityPreview.defaultProps = {
  size: {width: defaultPreviewSize.width, height: defaultPreviewSize.height},
};
export default memo(UniversityPreview);
