import express from "express";
import { DBManager } from './DBManagers/DBManager';
import Morgan from 'morgan';
export class Router {
    private router = express.Router();
    private dbmanager:DBManager
    private prefix = ""

    constructor(dbmanager:DBManager, prefix?:string){
        let prefixtest = prefix || dbmanager.prefix || ""
        this.prefix = prefixtest;
        this.dbmanager = dbmanager
   
        this.router.get(`${this.prefix}/`, this.dbmanager.get);
        this.router.get(`${this.prefix}/id/:id/`, this.dbmanager.getByID);
        this.router.post(`${this.prefix}/`, this.dbmanager.create);
        this.router.post(`${this.prefix}/arr/`, this.dbmanager.createMany)
        // this.router.put(`${prefix}/id/:id`, this.dbmanager.updateCollector);
        // this.router.delete(`${prefix}/id/:id`, this.dbmanager.deleteCollector);

    }
    public getRouter(){
        return this.router;
    }
}