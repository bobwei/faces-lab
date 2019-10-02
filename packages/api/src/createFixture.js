import fs from 'fs';
import * as R from 'ramda';

const fn = () => {
  const data = require('../tmp/input.json');
  const output = require('../tmp/output.json');
  const result = R.pipe(
    R.path(['data', 'user', 'edge_web_feed_timeline', 'edges']),
    R.map(R.prop('node')),
    R.concat(output),
    R.uniqBy(R.prop('id')),
  )(data);
  fs.writeFileSync('tmp/output.json', JSON.stringify(result, null, 2));
  console.log(`There are ${result.length} rows in output.json`);
};

if (require.main === module) {
  fn();
}
