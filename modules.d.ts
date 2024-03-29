declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    DB_URI: string;
    REDIS_URI: string;
    OTP_EXPIRATION_TIME_IN_MINS: string;
    JWT_ISSUER: string;
    JWT_AUDIENCE: string;
    AUTH_TOKEN_EXPIRATION: string;
    OTP_EXPIRATION_TIME: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    TEST_PHONE_NUMBER: string;
    TEST_OTP: string;
    BUCKET_NAME: string;
    FOLDER_NAME: string;
    STATS_KEY: string;
    GOOGLE_CREDENTIALS: string;
    SMS_SERVICE_BASE_URL: string;
    SMS_SERVICE_AUTH_KEY: string;
    SMS_SERVICE_SENDER_ID: string;
  }
}
