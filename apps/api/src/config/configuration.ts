export default () => ({
  port: parseInt(process.env.PORT ?? "4000", 10),
  nodeEnv: process.env.NODE_ENV ?? "development",

  database: {
    host: process.env.DB_HOST ?? "localhost",
    port: parseInt(process.env.DB_PORT ?? "3306", 10),
    user: process.env.DB_USER ?? "chinavista",
    password: process.env.DB_PASSWORD ?? "",
    name: process.env.DB_NAME ?? "chinavista",
    url: process.env.DATABASE_URL ?? "mysql://chinavista:chinavista@localhost:3306/chinavista",
  },

  redis: {
    host: process.env.REDIS_HOST ?? "localhost",
    port: parseInt(process.env.REDIS_PORT ?? "6379", 10),
    password: process.env.REDIS_PASSWORD ?? "",
  },

  elasticsearch: {
    host: process.env.ES_HOST ?? "http://localhost:9200",
    user: process.env.ES_USER ?? "elastic",
    password: process.env.ES_PASSWORD ?? "",
  },

  jwt: {
    secret: process.env.JWT_SECRET ?? "dev-secret-change-in-production",
    expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret-change",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "30d",
  },

  ai: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY ?? "",
      model: process.env.OPENAI_MODEL ?? "gpt-4o",
    },
    deepseek: {
      apiKey: process.env.DEEPSEEK_API_KEY ?? "",
      model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
    },
    qwen: {
      apiKey: process.env.QWEN_API_KEY ?? "",
      model: process.env.QWEN_MODEL ?? "qwen-max",
    },
  },

  maps: {
    amap: {
      apiKey: process.env.AMAP_API_KEY ?? "",
      apiSecret: process.env.AMAP_API_SECRET ?? "",
    },
    baidu: {
      ak: process.env.BAIDU_MAP_AK ?? "",
    },
  },

  payment: {
    wechat: {
      appId: process.env.WECHAT_PAY_APP_ID ?? "",
      mchId: process.env.WECHAT_PAY_MCH_ID ?? "",
      apiKey: process.env.WECHAT_PAY_API_KEY ?? "",
      apiV3Key: process.env.WECHAT_PAY_API_V3_KEY ?? "",
    },
    alipay: {
      appId: process.env.ALIPAY_APP_ID ?? "",
      privateKey: process.env.ALIPAY_PRIVATE_KEY ?? "",
      publicKey: process.env.ALIPAY_PUBLIC_KEY ?? "",
    },
  },
});
