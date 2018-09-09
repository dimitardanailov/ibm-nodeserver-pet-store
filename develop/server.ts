import "reflect-metadata"; // this shim is required
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import log4js = require('log4js');

require('appmetrics-dash').attach();
require('appmetrics-prometheus').attach();

const appName = require('./../package').name;
const logger = log4js.getLogger(appName);
const localConfig = require('./config/local.json');
const path = require('path');

// its important to set container before any operation you do with routing-controllers,
// including importing controllers
useContainer(Container);

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  routePrefix: "/api",
  controllers: [__dirname + '/controllers/*.js']
});

app.use(log4js.connectLogger(logger, {
  level: process.env.LOG_LEVEL || 'info'
}));
require('./routers/index')(app);

const port = process.env.PORT || localConfig.port;
app.listen(port, function () {
  logger.info(`pet-store listening on http://localhost:${port}/appmetrics-dash`);
  logger.info(`OpenAPI (Swagger) spec is available at http://localhost:${port}/swagger/api`);
  logger.info(`Swagger UI is available at http://localhost:${port}/explorer`);

});

app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

app.use(function (err, req, res, next) {
  res.sendFile(path.join(__dirname, '../public', '500.html'));
});
