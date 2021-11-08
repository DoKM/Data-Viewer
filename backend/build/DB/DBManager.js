"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManager = void 0;
var MongoDB_1 = require("./MongoDB");
var DBManager = /** @class */ (function () {
    function DBManager() {
        var _this = this;
        this.get = function (req, res, next) {
            console.log("yo");
            _this.db.getAll("collectors").then(function (result) {
                // console.log(result)
                res.json(result);
            });
        };
        this.db = new MongoDB_1.MongoDB();
    }
    return DBManager;
}());
exports.DBManager = DBManager;
//# sourceMappingURL=DBManager.js.map