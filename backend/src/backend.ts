import express from "express";


const app = express();
const bodyParser = require('body-parser');
const cors = require('permissive-cors');
const GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager;

import { Router } from "./DB/Router";

// const postgres = require('./postgres.js');
// const redis = require('./redis.js');
// const mongo = require('./mongo.js');
// const es = require('./es.js');



// import { MongoDB } from "./DB/DBS/mongo";
// const dbManager = new MongoDB()
import { DBManagers } from './DB/DBMangers';
import { DBManager } from './DB/DBManagers/DBManager';
const dbManagers = new DBManagers();

console.log('Start migrations');
// dbManager.migrate();


import Morgan from 'morgan';
// app.use(Morgan('combined'))

app.use(cors());
app.use(bodyParser.json());
app.use('/collector/', new Router(dbManagers.logger).getRouter());
app.use('/trips/', new Router(dbManagers.trips).getRouter());
app.use('/data/', new Router(dbManagers.data).getRouter());





const server = app.listen(3000, function() {
  console.log('Books backend running!');
});

const shutdownManager = new GracefulShutdownManager(server);
process.on('SIGINT', function onSigint() {
  shutdown();
});

process.on('SIGTERM', function onSigterm() {
  shutdown();
});

const shutdown = function() {
  shutdownManager.terminate(() => {
    console.log('Server is gracefully terminated.');
  });
};
