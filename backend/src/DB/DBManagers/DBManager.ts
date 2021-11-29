import {
    NextFunction,
    Request,
    Response
  } from "express";
import { DatabaseInterface } from "./DBS/DBInterface"

export class DBManager{
    constructor(dbManager: DatabaseInterface){
        this.db = dbManager
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

    public create = (req: Request, res: Response, next:NextFunction)=>{
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        console.log(req.body);
        this.db.create(collection, req.body, res)
    }

    public createMany = (req:Request, res: Response, next:NextFunction) => {
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        console.log(req.body);
        this.db.createMany(collection, req.body, res)
    }
}