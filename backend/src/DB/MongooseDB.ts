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

    public getAll = async (collectionName: string, res:Response):Promise<void> => {
        console.log("waddup")

        console.log("my name =")
        // let collections = await this.mongoose.connection.db.collections()
        // console.log(collections)
        let collection = this.mongoose.connection.collection(collectionName)
        
        // collection.d
        // console.log(await collection.countDocuments())
        // console.log(await collection.stats())

        collection.find(function (err: Error, products: String) {
            if (!err) {
            res.json(products);
            }
            });
        
        return
        



    }

    public getAllWith = async (location: JSON): Promise<void> => { return }
    public getID = async (location: string, id: string, res: Response): Promise<void> => { return }
    public getFirst = async (location: JSON): Promise<void> => { return }
    public create = async (location: JSON, jsonData: JSON): Promise<void> => { return }
    public createWithReturn = async (location: JSON, jsonData: JSON): Promise<void> => { return }
    public update = async (id: string, location: JSON, jsonData: JSON): Promise<void> => { return }
    public updateWithReturn = async (id: string, location: JSON, jsonData: JSON): Promise<void> => { return }
    public delete = async (id: string, location: JSON): Promise<void> => { return }
    public createTable = async (type: JSON): Promise<void> => { return }
    public migrateTable = async (type: JSON, table: string): Promise<void> => { return }
    public resetDB = async (): Promise<void> => { return }



}