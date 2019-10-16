import AsyncStorage from '@react-native-community/async-storage';

const fn = async (props) => {
  const { id } = props;
  const key = `ig:${id}`;
  await AsyncStorage.setItem(key, JSON.stringify(props));
  return props;
};

export default fn;
