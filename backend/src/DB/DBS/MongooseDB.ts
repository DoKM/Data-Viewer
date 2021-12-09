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
        this.connect("DataCollectors")
    }
   
    private mongoose: Mongoose

    private async connect(urlPart: string): Promise < void > {
        let url = `mongodb://127.0.0.1:27017/${urlPart}`;

        await new Promise < void > ((resolve, reject) => {
            let tryAmount = 0;
            const connectHandler = () => {
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
                // this.migrate();
                resolve();
            })
            connectHandler()
        })

    }


    public migrate() {

    }

    public getAll = async (collectionName: string):Promise<string> => {
        return new Promise < string > (async (resolve, reject) => {

            let collection = this.mongoose.connection.collection(collectionName)
        
            collection.find().toArray(function(err, results){
            
                resolve(JSON.stringify(results))
            })
        })
        
        
    }

    public getAllWith = async (location: JSON): Promise<void> => { return }
    public getID = async (collectionName: string, id: string): Promise<string> => { 
    
        let collection = this.mongoose.connection.collection(collectionName)
        
        
        let o_id = new ObjectId(id);
        
        let result = await collection.findOne({"_id": o_id});
    
        return JSON.stringify(result)
    }

    public getFirst = async (location: JSON): Promise<void> => { return }
    public create = async (collectionName: string, data:JSON): Promise<string> => { 

        let collection = this.mongoose.connection.collection(collectionName)
        let document = await collection.insertOne(data)
        return document.insertedId.toString();
        
    }

    public createMany = async (collectionName:string, data: JSON[]) => {
        let collection = this.mongoose.connection.collection(collectionName)
        
        collection.insertMany(data)
    }

    public createWithReturn = async (location: JSON, jsonData: JSON): Promise<void> => { return }

    public createCollection = async (collectionName: string): Promise<void> => {
        await this.mongoose.connection.createCollection(collectionName);
    }

    public update = async (id: string, collectionName: string, data:JSON): Promise<void> => { 
        let o_id = new ObjectId(id);
        let result = this.mongoose.connection.collection(collectionName).updateOne({"_id": o_id}, { $set: data})
        result.then((updateResult)=>{
            console.log(updateResult)
        })
    }
    public updateWithReturn = async (id: string, location: JSON, jsonData: JSON): Promise<void> => { return }
    public delete = async (id: string, collectionName: string): Promise<void> => {
        let o_id = new ObjectId(id);
        this.mongoose.connection.collection(collectionName).findOneAndDelete({"_id": o_id})
        return 
    }
    public dropCollection = async (collectionName:string): Promise<void> => {
        this.mongoose.connection.dropCollection(collectionName);
    }
    public createTable = async (type: JSON): Promise<void> => { return }
    public migrateTable = async (type: JSON, table: string): Promise<void> => { return }
    public resetDB = async (): Promise<void> => { return }



}