const express = require('express');
const axios = require('axios');
const redis = require('redis');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ✅ Enable CORS
app.use(cors());

// Load environment variables
const REDIS_HOST = process.env.REDIS_HOST || 'redis-service'; // ✅ Changed default to k8s service name
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

if (!OPENWEATHER_API_KEY) {
  console.error('❌ OPENWEATHER_API_KEY is not set. Set it via env or Kubernetes secret.');
  process.exit(1);
}

// ✅ Configure Redis client (fixed for Kubernetes)
let redisClient = null;

const createRedisClient = async () => {
  try {
    const client = redis.createClient({
      // ✅ Simple connection for Kubernetes internal service (no password, no TLS)
      url: `redis://${REDIS_HOST}:6379`,
      socket: {
        connectTimeout: 5000, // 5 second timeout
        // ✅ Removed TLS config - not needed for internal k8s communication
      }
    });

    client.on('error', (err) => {
      console.log('❌ Redis Error (will work without caching):', err.message);
      redisClient = null; // Disable Redis if it fails
    });

    await client.connect();
    console.log('✅ Connected to Redis');
    return client;
  } catch (err) {
    console.log('❌ Redis connection failed (will work without caching):', err.message);
    return null;
  }
};

// Try to connect to Redis, but don't fail if it doesn't work
createRedisClient().then(client => {
  redisClient = client;
});

app.get('/weather', async (req, res) => {
  console.log('🔍 Weather endpoint called with city:', req.query.city);
  
  const city = req.query.city || 'Ottawa';
  const cacheKey = `weather:${city.toLowerCase()}`;

  try {
    // Check cache only if Redis is available
    if (redisClient) {
      try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
          console.log('📦 Cache hit for:', city);
          return res.json({ source: 'cache', data: JSON.parse(cachedData) });
        }
      } catch (cacheErr) {
        console.log('❌ Cache read failed, fetching fresh data');
      }
    }

    console.log('📡 Fetching fresh data for:', city);
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });

    const data = response.data;

    // Cache only if Redis is available
    if (redisClient) {
      try {
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
        console.log('💾 Data cached for:', city);
      } catch (cacheErr) {
        console.log('❌ Cache write failed, but data still returned');
      }
    }

    res.json({ source: 'api', data });
  } catch (err) {
    console.error('❌ Error fetching weather data:', err.message);
    if (err.response) {
      console.error('❌ API Error:', err.response.status, err.response.data);
      res.status(err.response.status).json({ 
        error: 'Weather API error',
        details: err.response.data
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch weather data', details: err.message });
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    redis: redisClient ? 'connected' : 'disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend listening on port ${PORT}`);
  console.log(`📍 Test: http://localhost:${PORT}/weather`);
  console.log(`❤️  Health: http://localhost:${PORT}/health`);
});
// edited by nikolai