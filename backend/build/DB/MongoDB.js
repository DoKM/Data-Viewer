"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
var mongodb_1 = require("mongodb");
var MongoDB = /** @class */ (function () {
    function MongoDB() {
        var _this = this;
        this.getAll = function (location, res) { return __awaiter(_this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.collection(location)];
                    case 1:
                        collection = _a.sent();
                        console.log(collection);
                        // let docArray = await collection.find({}, { projection: { _id: 0 } }).toArray();
                        // console.log(docArray)
                        // docArray.forEach(doc=> {
                        //     console.log(doc.toString())
                        // })
                        // await collection.find(function (err: Error, products: string) {
                        //     if (err) throw err
                        //     console.log(JSON.parse(products));
                        //     });
                        this.db.collection(location).find({}).toArray(function (err, result) {
                            if (err) {
                                res.status(400).send("Error fetching listings!");
                            }
                            else {
                                console.log(result);
                                res.json(result);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.getAllWith = function (location) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        this.getID = function (location, id, res) { return __awaiter(_this, void 0, void 0, function () {
            var collection, o_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.collection(location)];
                    case 1:
                        collection = _a.sent();
                        console.log(location);
                        o_id = new mongodb_1.ObjectId(id);
                        console.log(o_id);
                        this.db.collection(location).find({ _id: o_id }).toArray(function (err, result) {
                            if (err) {
                                res.status(400).send("Error fetching listings!");
                            }
                            else {
                                console.log(result);
                                res.json(result);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.getFirst = function (location) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        this.create = function (location, jsonData) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        this.createWithReturn = function (location, jsonData) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        this.update = function (id, location, jsonData) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        this.updateWithReturn = function (id, location, jsonData) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        this.delete = function (id, location) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        this.createTable = function (type) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        this.migrateTable = function (type, table) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        this.resetDB = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        var urlPart = "simple-crud";
        var url = "mongodb://127.0.0.1:27017/";
        this.mongoClient = new mongodb_1.MongoClient(url);
        this.mongoClient.connect();
        this.db = this.mongoClient.db(urlPart);
    }
    MongoDB.prototype.migrate = function () { };
    return MongoDB;
}());
exports.MongoDB = MongoDB;
//# sourceMappingURL=MongoDB.js.map