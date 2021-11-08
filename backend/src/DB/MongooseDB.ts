import {
    CallbackError,
    Mongoose
} from "mongoose";
import {
    DatabaseInterface
} from "./DBInterface";
import {
    Error
} from "mongoose";
import e, {
    Response
} from "express";
import { resourceLimits } from "worker_threads";

export class MongooseDB implements DatabaseInterface {
    constructor() {
        this.mongoose = new Mongoose()
        this.connect("simple-crud")
    }
    private mongoose: Mongoose

    private async connect(urlPart: string): Promise < void > {
        let url = `mongodb://mongo/${urlPart}`;

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

    public getAll = async (collectionName: string):Promise<string> => {
        console.log("waddup")

        console.log("my name =")
        let collections = await this.mongoose.connection.db.collections()
        console.log(collections)
        let collection = await this.mongoose.connection.collection(collectionName)
        let schema
        // collection.d
        console.log(await collection.countDocuments())
        // console.log(await collection.stats())

        let result = await collection.find({})
        console.log(result)
        // res.json(result)
        return ""



    }

    public getAllWith(location: JSON): string {
        return "";
    }
    public getID(id: string, location: JSON): string {
        return "";
    }
    public getFirst(location: JSON): string {
        return "";
    }
    public create(location: JSON, jsonData: JSON): boolean {
        return false
    }
    public createWithReturn(location: JSON, jsonData: JSON): string {
        return "";
    }
    public update(id: string, location: JSON, jsonData: JSON): boolean {
        return false
    }
    public updateWithReturn(id: string, location: JSON, jsonData: JSON): string {
        return "string"
    }
    public delete(id: string, location: JSON): boolean {
        return false
    }
    public createTable(type: JSON): boolean {
        return false
    }
    public migrateTable(type: JSON, table: string): boolean {
        return false
    }
    public resetDB(): boolean {
        return false
    }

}