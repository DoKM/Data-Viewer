import { DBManager } from './DBManager';
import {
    NextFunction,
    Request,
    Response
  } from "express";

export class TripsManager extends DBManager {

    public prefix:string = "/collector/:collection"

    public get = async (req: Request, res: Response, next: NextFunction) => {
        
        let collection = req.params["collection"]?req.params["collection"]:"collectors"

        let result = await this.db.getAll(`collector_${collection}`)
        res.send(result)
    }

    public getByID = async (req: Request, res: Response, next: NextFunction) => {

        let collector = req.params["collection"]
        let id = req.params["id"]
        if(id == undefined || collector == undefined){
            res.sendStatus(400)
            return;
        }
        let result = await this.db.getID(`collector_${collector}`, id)

        res.send(result)
    }

    public create  = async (req: Request, res: Response, next:NextFunction) => {
        // super.create(req, res, next)
        
        let collection = req.params["collection"]?req.params["collection"]:"collectors"

        let objectID = await this.db.create(`collector_${collection}`, req.body)
        this.db.createCollection(`c_${collection}_t_${objectID}_d`)
        this.db.createCollection(`c_${collection}_t_${objectID}_g`)
        res.send(`c_${collection}_t_${objectID}`)
    }

}