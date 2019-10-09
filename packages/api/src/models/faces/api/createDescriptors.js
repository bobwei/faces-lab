import * as R from 'ramda';

import encode from '../functions/encode';
import runAtMost from '../../../functions/runAtMost';

const fn = ({ canvas, faceapi }, req, res) => {
  const { data } = req.body;
  const img = new canvas.Image();
  img.src = data;
  const promise = faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();
  return runAtMost(promise, 2000)
    .then(
      R.map(
        R.pipe(
          encode,
          R.omit(['landmarks', 'unshiftedLandmarks', 'alignedRect']),
        ),
      ),
    )
    .then((results) => res.json({ results }))
    .catch((error) => res.json({ error: error.toString() }));
};

export default R.curry(fn);
