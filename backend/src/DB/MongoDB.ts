import { Response } from "express";
import { DatabaseInterface } from "./DBInterface";
import { AnyError, Db, FindCursor, MongoClient, ReturnDocument } from "mongodb"
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
    public getAll = async (location: string, res:Response):Promise<string> => {
        
        const collection = await this.db.collection(location);
        console.log(collection)
        let returnThing = ""
        let array:string[] = []
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
        
        
        
        
        
        return ""
        }
        
        
    
    public getAllWith (location: JSON):string { return ""}
    public getID (id: string, location: JSON):string { return ""}
    public getFirst (location: JSON):string { return ""}
    public create (location: JSON, jsonData: JSON):boolean { return false }
    public createWithReturn (location: JSON, jsonData: JSON):string { return "" }
    public update (id: string, location: JSON, jsonData: JSON):boolean { return false }
    public updateWithReturn (id: string, location: JSON, jsonData: JSON):string { return"" }
    public delete (id: string, location: JSON):boolean { return false }
    public createTable (type: JSON):boolean {return false }
    public migrateTable (type: JSON, table: string):boolean {return false }
    public resetDB ():boolean { return false }

}