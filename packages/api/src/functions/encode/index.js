import * as R from 'ramda';

const fn = R.evolve({
  faceDescriptor: {
    descriptor: (data) => Array.from(data),
  },
});

export default fn;
