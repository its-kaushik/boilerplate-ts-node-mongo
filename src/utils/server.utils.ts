const express = require('express');
const logger = require('morgan');
import router from '../routes';

export const init = () => {
  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api/v1', router);

  return app;
};
