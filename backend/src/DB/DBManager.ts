import {
    NextFunction,
    Request,
    Response
  } from "express";
import { DatabaseInterface } from "./DBInterface"
import { MongooseDB as MongoDBBBB } from "./MongooseDB"
import { MongoDB } from "./MongoDB";
export class DBManager{
    constructor(){
        this.db = new MongoDB()

    }

    private db: DatabaseInterface

    public get = (req: Request, res: Response, next: NextFunction) => {
        console.log("yo")
        this.db.getAll("collectors").then((result) => {
            // console.log(result)
            res.json(result)
        })

    }
}