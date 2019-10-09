import fs from 'react-native-fs';
import axios from 'axios';
import { Buffer } from 'buffer';

import baseUrl from '../../api/config';

const fn = async ({ uri }) => {
  const data = await getData(uri);
  // prettier-ignore
  return axios
    .post(`${baseUrl}/faces/descriptor`, { data })
    .then((res) => res.data);
};

export default fn;

async function getData(uri) {
  const prefix = 'data:image/jpeg;base64,';
  if (uri.startsWith('http')) {
    return axios
      .get(uri, { responseType: 'arraybuffer' })
      .then((res) => prefix + Buffer.from(res.data, 'binary').toString('base64'));
  }
  return prefix + (await fs.readFile(uri, 'base64'));
}
