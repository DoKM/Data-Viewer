import { DBManager } from './DBManager';
import {
    NextFunction,
    Request,
    Response
  } from "express";
export class TripsManager extends DBManager {

    public get = async (req: Request, res: Response, next: NextFunction) => {
        console.log("TESTSDADAWDAS")
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        console.log(collection)
        console.log(req.params["collection"])
        let result = await this.db.getAll(collection, res)
        res.send(result)
    }

}