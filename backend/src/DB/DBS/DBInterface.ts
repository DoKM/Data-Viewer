import { NextFunction, Response } from "express";

export interface DatabaseInterface {
    migrate: () => void;
    getAll: (location:string) => Promise<string>;
    getAllWith: (location:JSON) => Promise<void>;
    getID: (location: string, id:string) => Promise<string>;
    getFirst: (location:JSON) => Promise<void>;
    create: (collectionName: string, data:JSON) => Promise<string>;
    createMany: (collectionName: string, data:JSON[]) => Promise<void>;
    createWithReturn: (location: JSON, jsonData: JSON) => Promise<void>;
    update: (id: string, collectionName: string, data:JSON) => Promise<void>;
    updateWithReturn: (id: string, location: JSON, jsonData: JSON) => Promise<void>;
    delete: (id: string, collectionName: string)=> Promise<void>;
    dropCollection: (collectionName:string)=> Promise<void>;
    createTable: (type: JSON) => Promise<void>;
    migrateTable: (type: JSON, table: string) => Promise<void>;
    resetDB: () => Promise<void>;
    createCollection: (collectionName: string) => Promise<void>;
}