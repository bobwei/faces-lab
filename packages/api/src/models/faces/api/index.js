import path from 'path';
import express from 'express';
import '@tensorflow/tfjs-node';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';

import createDescriptors from './createDescriptors';

const fn = async () => {
  const app = express();

  faceapi.env.monkeyPatch(canvas);
  const modelPath = path.resolve(__dirname, '../models');
  await faceapi.nets.tinyFaceDetector.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68TinyNet.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.mtcnn.loadFromDisk(modelPath);

  app.post('/descriptor', createDescriptors({ canvas, faceapi }));

  return app;
};

export default fn;
