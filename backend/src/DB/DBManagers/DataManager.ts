import { DBManager } from "./DBManager";
import { Request, Response, NextFunction } from 'express'

export class DataManager extends DBManager {
    public prefix:string = "/collector/:collection/trip/:trip"

    public get = async (req: Request, res: Response, next: NextFunction) => {
        console.log("hit")
        let collector = req.params["collection"]
        let trip = req.params["trip"]
        if(trip == undefined || collector == undefined){
            res.sendStatus(400)
            return;
        }
        console.log(collector)
        console.log(trip)
        let result = await this.db.getAll(`c_${collector}_t_${trip}_d`)
        res.send(result)
    }

    public create = async (req:Request, res:Response, next:NextFunction) => {
        let collector = req.params["collection"]
        let trip = req.params["trip"]
        if(trip == undefined || collector == undefined){
            res.sendStatus(400)
            return;
        }
        this.db.createMany(`c_${collector}_t_${trip}_d`, req.body)
        console.log(req.body)
        res.sendStatus(200);
    }

    public update = async (req:Request, res:Response, next:NextFunction) => {
        let collector = req.params["collection"]
        let trip = req.params["trip"]
        let id = req.params["id"]
        if(trip == undefined || collector == undefined || id == undefined){
            res.sendStatus(400)
            return;
        }

        this.db.update(id, `c_${collector}_t_${trip}_d`, req.body)
        res.sendStatus(200)
    }

    public delete = async (req:Request, res:Response, next:NextFunction) => {
        let collector = req.params["collection"]
        let trip = req.params["trip"]
        let id = req.params["id"]
        if(trip == undefined || collector == undefined || id == undefined){
            res.sendStatus(400)
            return;
        }
        this.db.delete(id, `c_${collector}_t_${trip}_d`)
        res.sendStatus(200)
    }
}