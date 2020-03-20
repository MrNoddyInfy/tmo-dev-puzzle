const CatboxRedis = require('@hapi/catbox-redis')

// cache config using catbox-redis
const CACHE_CONFIG = {
  name: 'stocks_cache',
  provider: {
    constructor: CatboxRedis,
    options: {
      host: '127.0.0.1',
      port: 6379
    }
  }
};

export const SERVER_CONFIG = {
    port: 3333,
    host: 'localhost',
    cache: [
      CACHE_CONFIG
    ]
}

export const ROUTES = {
    HOME: '/api',
    STOCKS: '/api/stocks'
}
