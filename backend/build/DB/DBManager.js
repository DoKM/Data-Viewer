"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManager = void 0;
var MongooseDB_1 = require("./MongooseDB");
var DBManager = /** @class */ (function () {
    function DBManager() {
        var _this = this;
        this.get = function (req, res, next) {
            console.log("yo");
            var collection = req.params["collection"] ? req.params["collection"] : "collectors";
            _this.db.getAll(collection, res);
        };
        this.getByID = function (req, res, next) {
            var collection = req.params["collection"] ? req.params["collection"] : "collectors";
            var id = req.params["id"];
            console.log("peepee");
            _this.db.getID(collection, id, res);
        };
        this.db = new MongooseDB_1.MongooseDB();
    }
    return DBManager;
}());
exports.DBManager = DBManager;
//# sourceMappingURL=DBManager.js.map