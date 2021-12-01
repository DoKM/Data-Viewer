import { DatabaseInterface } from "./DBS/DBInterface"
import { DBManager } from "./DBManagers/DBManager"
import { MongooseDB as Database } from "./DBS/MongooseDB"
import { LoggerManager } from "./DBManagers/LoggerManager"
import { TripsManager } from "./DBManagers/TripsManager"
import { DataManager } from "./DBManagers/DataManager"

export class DBManagers {

    private db:DatabaseInterface

    constructor(){
        this.db = new Database()
        this.default = new DBManager(this.db)
        this.logger = new LoggerManager(this.db)
        this.trips = new TripsManager(this.db)
        this.data = new DataManager(this.db)
    }

    public default:DBManager
    public logger:DBManager
    public trips:DBManager
    public data:DBManager

}