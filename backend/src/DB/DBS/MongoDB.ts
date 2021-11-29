//UNUSED CODE
import { Response } from "express";
import { DatabaseInterface } from "./DBInterface";
import { AnyError, Db, FindCursor, MongoClient, ReturnDocument, ObjectId  } from "mongodb"
import { rejects } from "assert";
import { Document, Error } from "mongoose";



export class MongoDB implements DatabaseInterface{

    private mongoClient:MongoClient
    private db: Db
    constructor(){
        let urlPart = "simple-crud"
        let url = `mongodb://127.0.0.1:27017/`
        this.mongoClient = new MongoClient(url, )
        this.mongoClient.connect()
        this.db = this.mongoClient.db(urlPart)
    }
    

    public migrate ():void { }
    public getAll = async (location: string, res:Response):Promise<void> => {
        
        const collection = await this.db.collection(location);
        console.log(collection)

        // let docArray = await collection.find({}, { projection: { _id: 0 } }).toArray();
        // console.log(docArray)

        // docArray.forEach(doc=> {
        //     console.log(doc.toString())
        // })
        // await collection.find(function (err: Error, products: string) {
        //     if (err) throw err
        //     console.log(JSON.parse(products));
        //     });
        this.db.collection(location).find({}).toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching listings!");
             } else {
                 console.log(result)
                res.json(result);
              }
        })

        return;

        }
        
        
    
    public getAllWith = async (location: JSON):Promise<void> => { return }
    public getID = async (location: string, id: string, res:Response):Promise<void> => { 
        const collection = await this.db.collection(location);
        console.log(location)
        // console.log(collection)
        // let returnThing = ""
        // let array:string[] = []
        // let docArray = await collection.find({}, { projection: { _id: 0 } }).toArray();
        // console.log(docArray)

        // docArray.forEach(doc=> {
        //     console.log(doc.toString())
        // })
        // await collection.find(function (err: Error, products: string) {
        //     if (err) throw err
        //     console.log(JSON.parse(products));
        //     });
        let o_id = new ObjectId(id);
        console.log(o_id)
        this.db.collection(location).find({_id:o_id}).toArray(function (err, result) {

            if (err) {
                console.log(err)
                res.status(400).send("Error fetching listings!");
             } else {
                console.log("Wut")
                res.json(result);
              }
        })
        // return
    }
    public getFirst = async (location: JSON):Promise<void> => { return}
    public create = async (location: JSON, jsonData: JSON):Promise<void> => { return }
    public createWithReturn = async (location: JSON, jsonData: JSON):Promise<void> => { return}
    public update = async (id: string, location: JSON, jsonData: JSON):Promise<void> => { return }
    public updateWithReturn = async (id: string, location: JSON, jsonData: JSON):Promise<void> => { return }
    public delete = async (id: string, location: JSON):Promise<void> => { return }
    public createTable = async (type: JSON):Promise<void> => {return }
    public migrateTable = async (type: JSON, table: string):Promise<void> => {return }
    public resetDB = async():Promise<void> => { return }

}