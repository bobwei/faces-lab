import * as R from 'ramda';

const fn = R.evolve({
  faceDescriptor: {
    descriptor: (data) => new Float32Array(data),
  },
});

export default fn;
