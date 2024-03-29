import { OTP_EXPIRED, INVALID_OTP } from '../contants/error';
import { customError } from './error.utils';
import { RedisClient } from './redis.utils';

// Generates a 4 digit OTP
const generateOtp = () => {
  const min = 1000;
  const max = 10000;
  return String(Math.floor(Math.random() * (max - min)) + min).padStart(4, '0');
};

const getOtpKey = (key: string) => {
  return `OTP:${key}`;
};

/**
 * set otp to redis and returns the same
 * @param {string} phoneNumber email of the user
 * @returns {string} otp
 */
export const setOtp = async (phoneNumber: any, testMode = false) => {
  let otp: any = process.env.TEST_OTP;
  if (!testMode) {
    otp = generateOtp();
  }
  await RedisClient.setWithExpiry(
    getOtpKey(phoneNumber),
    otp,
    +(process.env.OTP_EXPIRATION_TIME_IN_MINS as string)
  );
  return otp;
};

export const validateOtp = async (phoneNumber: string, inputOtp: string) => {
  const storedOtp = await RedisClient.get(getOtpKey(phoneNumber));
  if (!storedOtp) {
    throw customError(OTP_EXPIRED);
  }
  if (String(inputOtp) !== storedOtp) {
    throw customError(INVALID_OTP);
  }
  await RedisClient.delete(getOtpKey(phoneNumber));
};
