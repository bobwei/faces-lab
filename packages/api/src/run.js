import path from 'path';
import fs from 'fs';
import '@tensorflow/tfjs-node';
import * as R from 'ramda';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';

import addfaceDescriptor from './functions/addFaceDescriptor';
import decode from './functions/decode';
import encode from './functions/encode';

const fn = async () => {
  await init();

  const data = require('../tmp/output.json');
  const rows = await R.pipe(
    R.map(R.ifElse(R.has('faceDescriptor'), decode, addfaceDescriptor({ canvas, faceapi }))),
    (promises) => Promise.all(promises),
  )(data);
  fs.writeFileSync('tmp/output.json', JSON.stringify(R.map(encode)(rows), null, 2));

  const searchInputJson = require('../tmp/search.json');
  const searchInput = await R.pipe(
    R.ifElse(R.has('faceDescriptor'), decode, addfaceDescriptor({ canvas, faceapi })),
  )(searchInputJson);
  fs.writeFileSync('tmp/search.json', JSON.stringify(encode(searchInput), null, 2));

  R.pipe(
    R.reject(
      R.pipe(
        R.prop('faceDescriptor'),
        R.isEmpty,
      ),
    ),
    R.map((row) => {
      const { display_url: inputUrl } = searchInput;
      const { display_url: rowUrl } = row;
      const distance = faceapi.euclideanDistance(
        searchInput.faceDescriptor.descriptor,
        row.faceDescriptor.descriptor,
      );
      return {
        inputUrl,
        rowUrl,
        distance,
      };
    }),
    R.tap(console.log),
  )(rows);
};

async function init() {
  faceapi.env.monkeyPatch(canvas);

  const modelPath = path.resolve('./src/models');
  await faceapi.nets.tinyFaceDetector.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68TinyNet.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.mtcnn.loadFromDisk(modelPath);
}

if (require.main === module) {
  fn();
}
