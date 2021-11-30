import { DBManager } from './DBManager';
import {
    NextFunction,
    Request,
    Response
  } from "express";
export class TripsManager extends DBManager {

    public prefix:string = "/collector/:collection"

    public get = async (req: Request, res: Response, next: NextFunction) => {
        console.log("TESTSDADAWDAS")
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        console.log(collection)
        console.log(req.params["collection"])
        let result = await this.db.getAll(`collector_${collection}`, res)
        res.send(result)
    }

    public create  = async (req: Request, res: Response, next:NextFunction) => {
        // super.create(req, res, next)
        
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        console.log(collection)
        console.log(req.body);
        let objectID = await this.db.create(`collector_${collection}`, req.body, res)
        this.db.createCollection(`trip_${objectID}`, res)
        res.send(`trip_${objectID}`)
    }

}