import * as R from 'ramda';
import getFollowings from '@bobwei/instagram-api/lib/apis/getFollowings';
import AsyncStorage from '@react-native-community/async-storage';

import mapNodeToData from './mapNodeToData';
import mapDataToDescriptors from './mapDataToDescriptors';
import writeToStorage from './writeToStorage';

const hasFaceIndexesKey = 'hasFaceIndexesKey';

const fn = async () => {
  if ((await AsyncStorage.getItem(hasFaceIndexesKey)) === 'true') {
    return;
  }
  await AsyncStorage.setItem(hasFaceIndexesKey, 'true');
  return getFollowings({ first: 5, recursive: false })
    .then(
      R.pipeP(
        (data) => Promise.resolve(data),
        R.path(['data', 'user', 'edge_follow', 'edges']),
        R.map(mapNodeToData),
        R.map(mapDataToDescriptors),
        (promises) => Promise.all(promises),
        R.flatten,
        R.map(writeToStorage),
        (promises) => Promise.all(promises),
      ),
    )
    .catch(console.log);
};

export default fn;
