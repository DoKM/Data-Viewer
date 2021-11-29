import {
    NextFunction,
    Request,
    Response
  } from "express";
import { DatabaseInterface } from "../DBS/DBInterface"

export class DBManager{
    constructor(dbManager: DatabaseInterface){
        this.db = dbManager
    }

    protected db: DatabaseInterface

    public get = async (req: Request, res: Response, next: NextFunction) => {
        console.log("yo")
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        let result = await this.db.getAll(collection, res)
        res.send(result)
    }

    public getByID = async (req: Request, res: Response, next: NextFunction) => {
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        let id = req.params["id"]
        console.log(id)
        let result = await this.db.getID(collection, id, res)
        res.send(result)
    }

    public create = async (req: Request, res: Response, next:NextFunction)=>{
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        console.log(req.body);
        let result = this.db.create(collection, req.body, res)
        res.sendStatus(200).send(result)
    }

    public createMany = async (req:Request, res: Response, next:NextFunction) => {
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        console.log(req.body);
        this.db.createMany(collection, req.body, res)
        res.sendStatus(200)
    }
}