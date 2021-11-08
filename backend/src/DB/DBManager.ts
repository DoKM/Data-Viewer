import {
    NextFunction,
    Request,
    Response
  } from "express";
import { DatabaseInterface } from "./DBInterface"
// import { MongooseDB as MongoDBBBB } from "./MongooseDB"
import { MongoDB } from "./MongoDB";
export class DBManager{
    constructor(){
        this.db = new MongoDB()

    }

    private db: DatabaseInterface

    public get = (req: Request, res: Response, next: NextFunction) => {
        console.log("yo")
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        this.db.getAll(collection, res)

    }

    public getByID = (req: Request, res: Response, next: NextFunction) => {
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        let id = req.params["id"]
        console.log(id)
        this.db.getID(collection, id, res)
    }
}