import { NextFunction, Response } from "express";

export interface DatabaseInterface {
    migrate: () => void;
    getAll: (location:string, response:Response) => Promise<string>;
    getAllWith: (location:JSON) => Promise<void>;
    getID: (location: string, id:string, response:Response) => Promise<string>;
    getFirst: (location:JSON) => Promise<void>;
    create: (collectionName: string, data:JSON, res: Response) => Promise<string>;
    createMany: (collectionName: string, data:JSON[], res: Response) => Promise<void>;
    createWithReturn: (location: JSON, jsonData: JSON) => Promise<void>;
    update: (id: string, location: JSON, jsonData:JSON) => Promise<void>;
    updateWithReturn: (id: string, location: JSON, jsonData: JSON) => Promise<void>;
    delete: (id: string, location: JSON)=> Promise<void>;
    createTable: (type: JSON) => Promise<void>;
    migrateTable: (type: JSON, table: string) => Promise<void>;
    resetDB: () => Promise<void>;
    createCollection: (collectionName: string, res: Response) => Promise<void>;
}