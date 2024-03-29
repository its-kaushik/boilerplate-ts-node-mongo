import { readFileSync } from 'fs';
import { join } from 'path';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import uuid4 from 'uuid4';
import { RedisClient } from './redis.utils';
import { customError } from './error.utils';
import { INVALID_SESSION } from '../contants/error';

const publicKey = readFileSync(
  join(`${__dirname}/../../keys/jwtPublic.key`),
  'utf8'
);
const privateKey = readFileSync(
  join(`${__dirname}/../../keys/jwtPrivate.key`),
  'utf8'
);

const options: SignOptions = {
  issuer: process.env.JWT_ISSUER,
  subject: 'Authentication Token',
  audience: process.env.JWT_AUDIENCE,
  algorithm: 'RS256',
  expiresIn: process.env.AUTH_TOKEN_EXPIRATION || '30d',
};

const generateJWT = async (payload: any) => {
  return await sign(payload, privateKey, options);
};

const getSessionId = () => {
  return uuid4();
};

const getJwtRedisKey = (userId: any) => {
  return `JWT:${userId}`;
};

export const validateSession = async (payload: any) => {
  const storedSessionId = await RedisClient.get(getJwtRedisKey(payload.userId));
  if (storedSessionId !== payload.sessionId) throw customError(INVALID_SESSION);
};

export const getJWT = async (payload: any) => {
  const sessionId = getSessionId();
  const token = await generateJWT({
    userId: payload._id,
    sessionId,
  });

  await RedisClient.setWithExpiry(
    getJwtRedisKey(payload._id),
    sessionId,
    parseInt(process.env.AUTH_TOKEN_EXPIRATION || '30d', 10) * 24 * 60 * 60
  );
  return token;
};

export const invalidateJwt = async (userId: string) => {
  await RedisClient.delete(getJwtRedisKey(userId));
};

export const verifyJWT = async (token: string) => {
  return await verify(token, publicKey, options);
};
