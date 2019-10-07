import * as R from 'ramda';

import encode from '../functions/encode';

const fn = ({ canvas, faceapi }, req, res) => {
  const { data } = req.body;
  const img = new canvas.Image();
  img.src = data;
  return faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors()
    .then(
      R.map(
        R.pipe(
          encode,
          R.omit(['landmarks', 'unshiftedLandmarks', 'alignedRect']),
        ),
      ),
    )
    .then((results) => res.json({ results }))
    .catch((error) => res.json({ error }));
};

export default R.curry(fn);
