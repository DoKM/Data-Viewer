import express from "express";
import { DBManager } from './DBManagers/DBManager';
export class Router {
    private router = express.Router();
    private dbmanager:DBManager

    constructor(dbmanager:DBManager){
        this.dbmanager = dbmanager
        this.router.get('/', this.dbmanager.get);
        this.router.get('/id/:id', this.dbmanager.getByID);
        this.router.post('/', this.dbmanager.create);
        this.router.post('/arr', this.dbmanager.createMany)
        // this.router.put('/id/:id', this.dbmanager.updateCollector);
        // this.router.delete('/id/:id', this.dbmanager.deleteCollector);
    }
    public getRouter(){
        return this.router;
    }
}