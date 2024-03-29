import { createClient } from 'redis';

class Redis {
  client: any;
  constructor(redisUri: string) {
    this.client = createClient({
      url: redisUri,
    });
    this.client.on('error', (err: any) =>
      console.log('Redis Client Error--->', err.message)
    );
  }
  connect = async () => {
    await this.client.connect();
  };

  set = async (key: string, value: string) => {
    await this.client.set(key, value);
  };

  setWithExpiry = async (key: string, value: string, timeInMins: number) => {
    await this.client.set(key, value, {
      EX: timeInMins * 60,
    });
  };

  get = async (key: string) => {
    return await this.client.get(key);
  };

  delete = async (key: string) => {
    await this.client.del(key);
  };
}

export const RedisClient = new Redis(process.env.REDIS_URI as string);
