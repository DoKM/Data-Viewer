import { DBManager } from "./DBManager";
import { Request, Response, NextFunction } from 'express'

export class DataManager extends DBManager {
    public prefix:string = "/collector/:collection/trip/:trip"

    public get = async (req: Request, res: Response, next: NextFunction) => {
        console.log("hit")
        let collection = req.params["collection"]?req.params["collection"]:"collectors"
        let trip = req.params["trip"]?req.params["trip"]:"invalid"
        console.log(collection)
        console.log(trip)
        let result = await this.db.getAll(`c_${collection}_t_${trip}`)
        res.send(result)
    }
}