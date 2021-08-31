require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

// added by sultan
const logger = require('morgan');
const RateLimit = require('express-rate-limit');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// log every request
app.use(logger('dev'));


// Configure Request Rate Limiter
var limiter = new RateLimit({
  windowMs: 60 * 1000, // 1 minute window in milliseconds
  max: 200, // limit each IP to 200 requests per windowMs
  delayMs: 0,  // disable delaying - full speed until the max limit is reached
  statusCode: 429
})
app.all('*', limiter);

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/accounts', require('./accounts/accounts.controller'));
// app.use('/stores', require('./stores/stores.controller'));

// swagger docs route
app.use('/api-docs', require('_helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
