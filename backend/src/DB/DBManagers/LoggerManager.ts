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
        let objectID = await this.db.create(collection, req.body)
        this.db.createCollection(`collector_${objectID}`)
        res.send(`collector_${objectID}`)
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
        let id = req.params["id"]
        console.log("hello")
        try{ 
            let trips = await this.db.getAll(`collector_${id}`)
            console.log(trips)
            await JSON.parse(trips).forEach(async (trip:any) => {
                console.log(trip)
                if(trip["_id"] != undefined){
                    await this.db.dropCollection(`c_${id}_t_${trip["_id"]}_d`)
                    await this.db.dropCollection(`c_${id}_t_${trip["_id"]}_g`)
                }

            })
            await this.db.dropCollection(`collector_${id}`)
            await this.db.delete(id, "collectors")
            res.sendStatus(200)
        } catch(error){
            res.sendStatus(500)
        }

    }
}