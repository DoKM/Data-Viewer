import express from "express";
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const cors = require('permissive-cors');
const GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager;

// const postgres = require('./postgres.js');
// const redis = require('./redis.js');
// const mongo = require('./mongo.js');
// const es = require('./es.js');



import { MongoDB } from "./DB/DBS/mongo";
const dbManager = new MongoDB()
import { DBManagers } from "./DB/DBMangers";
const dbManagers = new DBManagers();

console.log('Start migrations');
dbManager.migrate();


app.use(cors());
app.use(bodyParser.json());

app.use('/collector/', router);
router.get('/', dbManagers.default.get);
router.get('/id/:id', dbManagers.default.getByID);
router.post('/', dbManagers.default.create);
router.post('/arr', dbManagers.default.createMany)
router.put('/id/:id', dbManager.updateCollector);
router.delete('/id/:id', dbManager.deleteCollector);

app.get("/test", dbManagers.default.get)


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
