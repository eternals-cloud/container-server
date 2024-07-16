import { env } from 'process';

export default () => ({
  PORT: parseInt(env.PORT, 10) || 5100,
  MONGO_DATABASE: {
    uri: env.MONGODB_URI,
    dbName: 'logistics',
    retryAttempts: 10,
  },
  S3_CONFIG: {
    region: env.S3_REGION,
    endpoint: env.S3_ENDPOINT,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY,
      secretAccessKey: env.S3_SECRET_KEY,
    },
  },
  REDIS_CONFIG: {
    socket: {
      host: env.REDIS_HOST,
      port: parseInt(env.REDIS_PORT, 10),
    },
    password: env.REDIS_PASSWORD,
  },
  RABBIT_MQ_CONFIG: `amqp://${env.RABBIT_MQ_USERNAME}:${encodeURI(env.RABBIT_MQ_PASSWORD)}@${env.RABBIT_MQ_HOST}:${env.RABBIT_MQ_PORT}/${env.RABBIT_MQ_VHOST}`,
});
