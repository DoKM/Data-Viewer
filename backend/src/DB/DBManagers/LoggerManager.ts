import { DBManager } from './DBManager';
import {
    NextFunction,
    Request,
    Response
  } from "express";
export class LoggerManager extends DBManager {
    public create  = async (req: Request, res: Response, next:NextFunction) => {
        // super.create(req, res, next)
        
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        console.log(collection)
        console.log(req.body);
        let objectID = await this.db.create(collection, req.body, res)
        this.db.createCollection(`collector_${objectID}`, res)
        res.send(`collector_${objectID}`)
    }
}