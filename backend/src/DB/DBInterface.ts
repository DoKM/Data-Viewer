import { NextFunction } from "express";

interface DatabaseInterface {
    migrate: () => void;
    getAll: (location:JSON) => string;
    getAllWith: (location:JSON) => string;
    getID: (id: string, location:JSON) => string;
    getFirst: (location:JSON) => string;
    create: (location: JSON, jsonData: JSON) => boolean;
    createWithReturn: (location: JSON, jsonData: JSON) => JSON;
    update: (id: string, location: JSON, jsonData:JSON) => boolean;
    updateWithReturn: (id: string, location: JSON, jsonData: JSON) => JSON;
    delete: (id: string, location: JSON)=> boolean;
    createTable: (type: JSON) => boolean;
    migrateTable: (type: JSON, table: string) => boolean;
}