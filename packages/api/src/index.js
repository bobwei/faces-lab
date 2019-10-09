import express from 'express';
import bodyParser from 'body-parser';

import createFacesApi from './models/faces/api';

const fn = async () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/faces', await createFacesApi());

  return app;
};

export default fn;

if (require.main === module) {
  const { PORT = 8082 } = process.env;
  (async () => {
    const app = await fn();
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
    process.on('unhandledRejection', (err) => {
      if (err.toString() === 'TypeError: media.addEventListener is not a function') {
        // face not found or unable to load image data
      }
    });
  })();
}
