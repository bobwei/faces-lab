import { useState } from 'react';
import ImageResizer from 'react-native-image-resizer';
import fs from 'react-native-fs';
import axios from 'axios';

import baseUrl from '../api/config';

const defaultResizeConfig = [600, 600, 'JPEG', 80];

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
      .then((data) => setDescriptors(data.results))
      .catch(console.log);
  }
  return [descriptors, run];
}

export default useFaceDescriptors;
