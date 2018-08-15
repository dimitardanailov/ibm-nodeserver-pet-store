var express = require('express');

module.exports = function(app, basepath) {
  var router = express.Router();

  router.get('/pets', function (req, res, next) {
    res.json({});
  })

  router.post('/pets', function (req, res, next) {
    res.json({});
  })

  router.get('/pets/:petId', function (req, res, next) {
    res.json({});
  })

  app.use(basepath, router);
}

