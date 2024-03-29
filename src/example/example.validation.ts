import joi = require('joi');
import { stringRequired, string } from '../../validations';

export const createExampleValidation = joi.object({
  name: stringRequired,
  text: stringRequired,
});

export const updateExampleValidation = joi.object({
  query: joi.object({
    _id: stringRequired,
  }),
  payload: joi.object({
    name: string,
    text: string,
  }),
});
