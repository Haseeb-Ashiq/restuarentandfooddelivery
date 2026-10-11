const Redis = require('ioredis');

// Determine host based on environment (default to localhost for host machine)
const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = new Redis({
  host: redisHost,
  port: redisPort,
  // Optional: add password if configured in Redis container
  // password: process.env.REDIS_PASSWORD,
  retryStrategy(times) {
    // Retry connection after a delay if Redis drops
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

// Event listeners for debugging connection status
redisClient.on('connect', () => {
  console.log('Successfully connected to Redis container');
});

redisClient.on('error', (err) => {
  console.error('ioredis connection error:', err.message);
});

module.exports = redisClient;