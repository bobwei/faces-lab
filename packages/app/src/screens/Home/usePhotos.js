import {useEffect, useState} from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import * as R from 'ramda';

const transform = R.pipe(
  R.prop('edges'),
  R.map(R.prop('node')),
  R.map(
    R.applySpec({
      source: R.pipe(
        R.prop('image'),
        R.pick(['uri']),
      ),
    }),
  ),
);

function usePhotos() {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    CameraRoll.getPhotos({first: 10})
      .then(transform)
      .then(data => setPhotos(data));
  }, []);
  return [photos, setPhotos];
}

export default usePhotos;
