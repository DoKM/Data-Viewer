import { NextFunction, Response } from "express";

export interface DatabaseInterface {
    migrate: () => void;
    getAll: (location:string, response:Response) => Promise<string>;
    getAllWith: (location:JSON) => string;
    getID: (id: string, location:JSON) => string;
    getFirst: (location:JSON) => string;
    create: (location: JSON, jsonData: JSON) => boolean;
    createWithReturn: (location: JSON, jsonData: JSON) => string;
    update: (id: string, location: JSON, jsonData:JSON) => boolean;
    updateWithReturn: (id: string, location: JSON, jsonData: JSON) => string;
    delete: (id: string, location: JSON)=> boolean;
    createTable: (type: JSON) => boolean;
    migrateTable: (type: JSON, table: string) => boolean;
    resetDB: () => boolean;
}