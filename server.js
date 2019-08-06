const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const Jimp = require('jimp');

const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server
      .use(helmet())
      .use(compression())
      .use(bodyParser.json({ limit: '10mb' }))
      .use(morgan('dev'));

    server.post('/api/images/merge', async (req, res) => {
      const { photoURL, frameURL } = req.body;

      if (!photoURL || !frameURL)
        return res.status(400).json({ message: 'params is invalid.' });

      const buff = Buffer.from(
        photoURL.slice(photoURL.indexOf('base64') + 7),
        'base64'
      );
      const photo = await Jimp.read(buff);
      const frame = await Jimp.read(frameURL);

      const w = frame.getWidth();
      const h = frame.getHeight();

      photo.scaleToFit(w, h);
      photo.blit(frame, 0, 0);

      const data = await photo.getBase64Async('image/png');

      return res.status(200).json({ data });
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`Server run on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  });

process.on('unhandledRejection', err => console.log(err));
