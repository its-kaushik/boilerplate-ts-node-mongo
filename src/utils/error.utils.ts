import { Response } from 'express';

type ErrorType = {
  message: string;
  customCode: number;
  code: number;
};

export const customError = (error: ErrorType) => {
  const { code, message, customCode } = error;
  const err: any = new Error(message);
  err.status = code;
  err.customCode = customCode;
  err.expose = true;
  return err;
};

export const ErrorResponse = (res: Response, error: any) => {
  const errorText = error.detail || error.message || error;
  const statusCode = error.customCode || error.status || 500;

  res.status(error.status || 500);
  res.json({
    success: false,
    statusCode,
    error: errorText,
  });
};
