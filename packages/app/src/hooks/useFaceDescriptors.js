import { useState } from 'react';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation-stack';
import ImageResizer from 'react-native-image-resizer';
import * as R from 'ramda';

import createFaceDescriptors from '../functions/createFaceDescriptors';

const { width: maxWidth, height: maxHeight } = Dimensions.get('screen');
const defaultResizeConfig = [maxWidth, maxHeight, 'JPEG', 60];

function useFaceDescriptors() {
  const [descriptors, setDescriptors] = useState([]);
  function run(photo) {
    return ImageResizer.createResizedImage(photo.source.uri, ...defaultResizeConfig)
      .then(createFaceDescriptors)
      .then(
        R.evolve({
          results: R.map(withDetection),
        }),
      )
      .then((data) => setDescriptors(data.results))
      .catch(console.log);
  }
  return [descriptors, run];
}

export default useFaceDescriptors;

function withDetection({ detection, ...props }) {
  const offset = (maxHeight - detection._imageDims._height - Header.HEIGHT) / 2;
  const { _x: left, _y: top, _width: width, _height: height } = detection._box;
  return {
    ...props,
    detection: {
      top: top + offset,
      left,
      width,
      height,
    },
  };
}
