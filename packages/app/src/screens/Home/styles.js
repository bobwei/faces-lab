import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const photoPadding = 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    padding: photoPadding,
  },
  row: {
    flexDirection: 'row',
  },
});

export const getPhotoStyle = (numColumns) => {
  const photoWidth = (width - photoPadding * 2) / numColumns - photoPadding * 2;
  return {
    width: photoWidth,
    height: photoWidth,
  };
};

export default styles;
