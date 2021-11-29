import { DatabaseInterface } from "./DBS/DBInterface"
import { DBManager } from "./DBManager"
import { MongooseDB as Database } from "./DBS/MongooseDB"

export class DBManagers {

    private db:DatabaseInterface

    constructor(){
        this.db = new Database()
        this.default = new DBManager(this.db)
    }

    public default:DBManager
}