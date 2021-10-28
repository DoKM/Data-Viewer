"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var app = (0, express_1.default)();
var bodyParser = require('body-parser');
var cors = require('permissive-cors');
var GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager;
// const postgres = require('./postgres.js');
// const redis = require('./redis.js');
// const mongo = require('./mongo.js');
// const es = require('./es.js');
var mongo_1 = require("./mongo");
var dbManager = new mongo_1.MongoDB();
console.log('Start migrations');
dbManager.Migration();
app.use(cors());
app.use(bodyParser.json());
app.use('/collector/', router);
router.get('/', dbManager.getCollectors);
router.get('/:id', dbManager.getCollectorById);
router.post('/', dbManager.postCollector);
router.put('/:id', dbManager.updateCollector);
router.delete('/:id', dbManager.deleteCollector);
var server = app.listen(3000, function () {
    console.log('Books backend running!');
});
var shutdownManager = new GracefulShutdownManager(server);
process.on('SIGINT', function onSigint() {
    shutdown();
});
process.on('SIGTERM', function onSigterm() {
    shutdown();
});
var shutdown = function () {
    shutdownManager.terminate(function () {
        console.log('Server is gracefully terminated.');
    });
};
//# sourceMappingURL=backend.js.map