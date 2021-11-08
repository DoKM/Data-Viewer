import { NextFunction, Response } from "express";

export interface DatabaseInterface {
    migrate: () => void;
    getAll: (location:string, response:Response) => Promise<void>;
    getAllWith: (location:JSON) => Promise<void>;
    getID: (location: string, id:string, response:Response) => Promise<void>;
    getFirst: (location:JSON) => Promise<void>;
    create: (location: JSON, jsonData: JSON) => Promise<void>;
    createWithReturn: (location: JSON, jsonData: JSON) => Promise<void>;
    update: (id: string, location: JSON, jsonData:JSON) => Promise<void>;
    updateWithReturn: (id: string, location: JSON, jsonData: JSON) => Promise<void>;
    delete: (id: string, location: JSON)=> Promise<void>;
    createTable: (type: JSON) => Promise<void>;
    migrateTable: (type: JSON, table: string) => Promise<void>;
    resetDB: () => Promise<void>;
}