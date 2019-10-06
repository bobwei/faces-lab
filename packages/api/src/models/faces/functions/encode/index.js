import * as R from 'ramda';

const fn = R.evolve({
  descriptor: (val) => Array.from(val),
});

export default fn;
