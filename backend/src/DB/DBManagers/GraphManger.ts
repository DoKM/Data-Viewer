import { DBManager } from "./DBManager";
import {
    NextFunction,
    Request,
    Response
  } from "express";
export class GraphManager extends DBManager {

    public prefix:string = "/collector/:collection/trip/:trip"

    public create  = async (req: Request, res: Response, next:NextFunction) => {
        let collector = req.params["collection"]
        let trip = req.params["trip"]
        
        if(trip == undefined || collector == undefined){
            res.sendStatus(400)
            return;
        }
        console.log(req.body)
        this.db.create(`c_${collector}_t_${trip}_g`, req.body)
        res.sendStatus(200)
    }

    public update = async (req:Request, res:Response, next:NextFunction) => {
        let collector = req.params["collection"]
        let trip = req.params["trip"]
        let id = req.params["id"]
        if(trip == undefined || collector == undefined || id == undefined){
            res.sendStatus(400)
            return;
        }
        let body = req.body
        delete body["_id"]
        this.db.update(id, `c_${collector}_t_${trip}_g`, body)
        res.sendStatus(200)
    }

    public get = async (req: Request, res: Response, next: NextFunction) => {
        
        let collector = req.params["collection"]
        let trip = req.params["trip"]
        if(trip == undefined || collector == undefined){
            res.sendStatus(400)
            return;
        }

        let result = await this.db.getAll(`c_${collector}_t_${trip}_g`)
        res.send(result)
    }

    public delete = async (req:Request, res:Response, next:NextFunction) => {
        let collector = req.params["collection"]
        let trip = req.params["trip"]
        let id = req.params["id"]
        if(trip == undefined || collector == undefined || id == undefined){
            res.sendStatus(400)
            return;
        }
        this.db.delete(id, `c_${collector}_t_${trip}_g`)
        res.sendStatus(200)
    }

    
}