import { AUTH_HEADER_MISSING } from '../contants/error';
import {
  customError,
  ErrorResponse,
  validateSession,
  verifyJWT,
} from '../utils';

export const isAuthenticated = async (req: any, res: any, next: any) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw customError(AUTH_HEADER_MISSING);
    }
    const payload = await verifyJWT(authorization);

    await validateSession(payload);

    req['user'] = payload;
    return next();
  } catch (error) {
    ErrorResponse(res, error);
  }
};
