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
    public prefix:string = ""

    protected db: DatabaseInterface

    public get = async (req: Request, res: Response, next: NextFunction) => {
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        let result = await this.db.getAll(collection)
        res.send(result)
    }

    public getByID = async (req: Request, res: Response, next: NextFunction) => {
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        let id = req.params["id"]
        console.log(id)
        let result = await this.db.getID(collection, id)
        res.send(result)
    }

    public create = async (req: Request, res: Response, next:NextFunction)=>{
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        console.log(req.body);
        let result = this.db.create(collection, req.body)
        res.sendStatus(200).send(result)
    }

    public createMany = async (req:Request, res: Response, next:NextFunction) => {
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        console.log(req.body);
        this.db.createMany(collection, req.body)
        res.sendStatus(200)
    }

    public update = async (req:Request, res: Response, next:NextFunction) => {
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        let id = req.params["id"]
        console.log(req.body)
        let result = this.db.update(id, collection, req.body)
        console.log(result)
        res.sendStatus(200)
    }

    public delete = async (req:Request, res: Response, next:NextFunction) => {
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        let id = req.params["id"]
        // this.db.delete(id, collection)
    }
}