import { useEffect, useState } from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import * as R from 'ramda';

const transform = R.pipe(
  R.prop('edges'),
  R.map(R.prop('node')),
  R.map(
    R.applySpec({
      source: R.prop('image'),
    }),
  ),
);

function usePhotos() {
  const [photos, setPhotos] = useState([]);
  const [after, setAfter] = useState();

  useEffect(() => {
    loadData();
  }, []);

  function loadData(props = { first: 10, after, assetType: 'Photos' }) {
    return CameraRoll.getPhotos(props)
      .then((result) => {
        const data = transform(result);
        setPhotos((val) => (!props.after ? data : [...val, ...data]));
        const endCursor = R.path(['page_info', 'end_cursor'])(result);
        setAfter(endCursor);
      })
      .catch(console.log);
  }

  return [photos, setPhotos, loadData];
}

export default usePhotos;
