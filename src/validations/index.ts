const joi = require('joi');

export const uuidValidation = joi.string().guid({
  version: ['uuidv4'],
});

export const string = joi.string().allow('');
export const stringRequired = joi.string().required();
export const number = joi.number();
export const numberRequired = joi.number().required();
export const boolean = joi.boolean();
export const objectRequired = joi.object().required();
export const array = (elementValidation: any) =>
  joi.array().items(elementValidation);
export const enumValidation = (enumValidation: any) =>
  joi.string().valid(...enumValidation);

export const idValidator = joi.object({
  id: stringRequired,
});
export const emailRequired = joi
  .string()
  .email({ tlds: { allow: false } })
  .required();
