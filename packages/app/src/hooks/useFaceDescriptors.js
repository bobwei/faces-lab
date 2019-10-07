import { useState } from 'react';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation-stack';
import ImageResizer from 'react-native-image-resizer';
import fs from 'react-native-fs';
import axios from 'axios';
import * as R from 'ramda';

import baseUrl from '../api/config';

const { width: maxWidth, height: maxHeight } = Dimensions.get('screen');
const defaultResizeConfig = [maxWidth, maxHeight, 'JPEG', 60];

function useFaceDescriptors() {
  const [descriptors, setDescriptors] = useState([]);
  function run(photo) {
    return ImageResizer.createResizedImage(photo.source.uri, ...defaultResizeConfig)
      .then(async ({ uri }) => {
        return 'data:image/jpeg;base64,' + (await fs.readFile(uri, 'base64'));
      })
      .then((data) => {
        // prettier-ignore
        return axios
          .post(`${baseUrl}/faces/descriptor`, { data })
          .then((res) => res.data);
      })
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
