import * as R from 'ramda';

import encode from '../functions/encode';

const fn = async ({ canvas, faceapi }, req, res) => {
  const { data } = req.body;
  const img = new canvas.Image();
  img.src = data;
  const faceDescriptors = await faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const results = faceDescriptors.map(encode);
  res.json({ results });
};

export default R.curry(fn);
