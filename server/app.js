// 'use strict';

/** Module dependencies. */
const express        = require('express');
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');
const cors           = require('cors');
const path           = require('path');
const logger         = require('morgan');
const routes         = require('./routes');
const config         = require('./config');

const environment = process.env.NODE_ENV || 'development';
const host = '0.0.0.0';
const port = process.env.PORT || config[environment].node_port;

const sess = {
  secret: config.secret,
  cookie: {}
}
// configure the express server
const app = express();

app.set('port', port);
app.use(logger('dev'))
.use(cors())
.use(cookieParser())
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))
.use('/', routes)
.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header  ('Access-Control-Allow-Headers', '*');
  next();
})

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Start her up, boys
app.listen(app.get('port'), host, () => {
  console.log('Express server listening on port ' + app.get('port'));
});
