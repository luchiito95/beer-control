export default () => ({
  app: {
    name: process.env.APP_NAME,
    port: parseInt(process.env.APP_PORT ?? '3000', 10),
    version: process.env.APP_VERSION,
    environment: process.env.NODE_ENV,
  },
});
