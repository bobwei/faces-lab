import * as R from 'ramda';

const fn = R.pipe(
  R.prop('node'),
  R.applySpec({
    id: R.prop('id'),
    source: {
      uri: ({ profile_pic_url: url1, display_url: url2 }) => url1 || url2,
    },
    data: R.identity,
  }),
);

export default fn;
