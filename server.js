const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
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

const FRAMES = ['https://tuoitrevietnam.vn/avatar/img/ava1.png'];
const DEFAULT_IMGS = [
  'https://video-thumbs-ext.mediacdn.vn/thumb_w/650/2019/5/6/minh-nghi-15571602825331833982918.png'
];

app
  .prepare()
  .then(() => {
    const expressApp = express();
    const httpServer = http.createServer(expressApp);
    const io = socketIO(httpServer);

    expressApp
      .use(helmet())
      .use(compression())
      .use(bodyParser.json({ limit: '10mb' }))
      .use(morgan('dev'));

    expressApp.get('*', (req, res) => {
      return handle(req, res);
    });

    io.on('connection', socket => {
      console.log('A user connected.');

      socket.on('requestInitialData', id => {
        const framePhotoURL = FRAMES[id] || '';
        const defaultPhotoURL = DEFAULT_IMGS[id] || '';

        socket.emit('responseInitialData', framePhotoURL, defaultPhotoURL);
      });

      socket.on('requestCombineImage', async (frameId, userPhotoData) => {
        const buff = Buffer.from(
          userPhotoData.slice(userPhotoData.indexOf('base64') + 7),
          'base64'
        );

        const photo = await Jimp.read(buff);

        const frameURL = FRAMES[frameId];

        const frame = await Jimp.read(frameURL);

        const w = frame.getWidth();
        const h = frame.getHeight();

        photo.scaleToFit(w, h);
        photo.blit(frame, 0, 0);

        const data = await photo.getBase64Async('image/png');

        socket.emit('responseCombineImage', data);
      });

      socket.on('disconnect', () => {
        console.log('A user disconnect.');
      });
    });

    httpServer.listen(PORT, err => {
      if (err) throw err;
      console.log(`Server run on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  });

process.on('unhandledRejection', err => console.log(err));
