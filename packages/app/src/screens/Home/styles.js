import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    padding: 2,
  },
});

const {width} = Dimensions.get('window');

export const getPhotoStyle = numColumns => ({
  width: width / numColumns,
  height: width / numColumns,
});

export default styles;
