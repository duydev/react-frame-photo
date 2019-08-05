const express = require('express');
const debug = require('debug')('app');
const next = require('next');

const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/api', (req, res) => res.json({ a: 1 }));

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      debug(`Server run on port ${PORT}.`);
    });
  })
  .catch(err => {
    debug(err.stack);
    process.exit(1);
  });
