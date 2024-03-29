import { Request, Response } from 'express';
import { Schema } from 'joi';
import { ErrorResponse, customError } from '../utils';
import { BAD_REQUEST } from '../contants/error';

enum ValidationType {
  PARAMS = 'p',
  QUERY = 'q',
  BODY = 'b',
}

type ValidatorType = {
  [key in ValidationType]?: Schema;
};

export const Validate =
  (validators: ValidatorType) =>
  async (req: Request, res: Response, next: any) => {
    try {
      const errors = Object.entries(validators).map(([type, schema]) => {
        let errorObj;
        switch (type) {
          case 'p':
            errorObj = schema.validate(req.params).error;
            break;
          case 'q':
            errorObj = schema.validate(req.query).error;
            break;
          case 'b':
            errorObj = schema.validate(req.body).error;
            break;
        }
        if (errorObj) {
          return errorObj.message;
        }
        return errorObj;
      });

      const hasErrors = errors.some((error) => error !== undefined);

      if (hasErrors) {
        BAD_REQUEST.message = errors.join(',');
        throw customError(BAD_REQUEST);
      }

      await next();
    } catch (error) {
      ErrorResponse(res, error);
    }
  };
