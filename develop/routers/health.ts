module.exports = (app) => {
  const router = require('express').Router();

  router.get('/', (req, res, next) => {
    res.json({ status: 'UP' });
  });

  app.use('/health', router);
}
