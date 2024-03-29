import { Response } from 'express';

export const SuccessResponse = (
  res: Response,
  data: any = {},
  code = 200,
  metadata: null | object = null
) => {
  const statusCode = code;
  res.status(statusCode);

  res.json({
    success: true,
    ...(metadata && { ...metadata }),
    statusCode,
    data,
  });
};
