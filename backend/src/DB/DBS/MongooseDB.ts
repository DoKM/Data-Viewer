import {
    CallbackError,
    Document,
    Mongoose
} from "mongoose";
import {
    DatabaseInterface
} from "./DBInterface";
import { Error } from 'mongoose';
import e, {
    Response
} from "express";
import { resourceLimits } from "worker_threads";
import { ObjectId } from "bson";

export class MongooseDB implements DatabaseInterface {
    constructor() {
        this.mongoose = new Mongoose()
        this.connect("simple-crud")
    }
   
    private mongoose: Mongoose

    private async connect(urlPart: string): Promise < void > {
        let url = `mongodb://127.0.0.1:27017/${urlPart}`;

        return await new Promise < void > ((resolve, reject) => {
            let tryAmount = 0;
            const connectHandler = (url: string, tryAmount: number) => {
                this.mongoose.connect(url, (err: CallbackError) => {
                    if (err) {
                        tryAmount++;

                        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
                        if (tryAmount > 8) {
                            let error = new Error("Connection failed more than 10 times")
                            reject(error);
                        }
                        setTimeout(connectHandler, 5000, urlPart, tryAmount);
                    }
                });
            }
            this.mongoose.connection.on('open', () => {
                resolve();
            })
            connectHandler(url, tryAmount)
        })

    }


    public migrate() {

    }

    public getAll = async (collectionName: string, res:Response):Promise<string> => {
        return new Promise < string > (async (resolve, reject) => {

            let collection = this.mongoose.connection.collection(collectionName)
        
            await collection.find().toArray(function(err, results){
            
                resolve(JSON.stringify(results))
            })
        })
        
        
    }

    public getAllWith = async (location: JSON): Promise<void> => { return }
    public getID = async (collectionName: string, id: string, res: Response): Promise<string> => { 
    
        let collection = this.mongoose.connection.collection(collectionName)
        
        
        let o_id = new ObjectId(id);
        
        let result = await collection.findOne({"_id": o_id});
    
        return JSON.stringify(result)
    }

    public getFirst = async (location: JSON): Promise<void> => { return }
    public create = async (collectionName: string, data:JSON, res: Response): Promise<string> => { 

        let collection = this.mongoose.connection.collection(collectionName)
        let document = await collection.insertOne(data)
        return document.insertedId.toString();
        
    }

    public createMany = async (collectionName:string, data: JSON[], res:Response) => {
        let collection = this.mongoose.connection.collection(collectionName)
        
        collection.insertMany(data)
    }

    public createWithReturn = async (location: JSON, jsonData: JSON): Promise<void> => { return }

    public createCollection = async (collectionName: string, res:Response): Promise<void> => {
        await this.mongoose.connection.createCollection(collectionName);
    }

    public update = async (id: string, location: JSON, jsonData: JSON): Promise<void> => { return }
    public updateWithReturn = async (id: string, location: JSON, jsonData: JSON): Promise<void> => { return }
    public delete = async (id: string, location: JSON): Promise<void> => { return }
    public createTable = async (type: JSON): Promise<void> => { return }
    public migrateTable = async (type: JSON, table: string): Promise<void> => { return }
    public resetDB = async (): Promise<void> => { return }



}