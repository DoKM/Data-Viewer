import {
  NextFunction,
  Request,
  Response
} from "express";
import {
  Error
} from "mongoose";


export class MongoDB {
  private mongoose = require('mongoose');
  private collectorSchema = this.mongoose.Schema({
    name: String,
    owner: String,
    description: String,
  }, {
    timestamps: true
  });
  private collector = this.mongoose.model('Collector', this.collectorSchema);

  private connectWithRetry = () => {
    return this.mongoose.connect('mongodb://mongo/simple-crud',  (err: Error) => {
      if (err) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        setTimeout(this.connectWithRetry, 5000);
      }
    });
  };

  public migrate = () => {
    this.connectWithRetry();
    console.log('Mongo connection succesful');
    this.mongoose.connection.on('open', () => {
      this.mongoose.connection.db.dropDatabase();
      this.collector.create({
        "name": "Test",
        "owner": "DoKM",
        "description": "Testing entry for no reason",
      }, function (err: Error) {
        if (err) console.error('Failed to create start collector', err);
      });
    });
  };

  public getCollectors = async (req: Request, res: Response, next: NextFunction) => {
    
    await this.collector.find(function (err: Error, products: String) {
      if (err) return next(err);
      res.json(products);
      });
    
  };

  public getCollectorById = async (req: Request, res: Response, next: NextFunction) => {
    await this.collector.findById(req.params.id, function (err: Error, post: String) {
      if (err) return next(err);
      res.json(post);
    });
  };

  public postCollector = async (req: Request, res: Response, next: NextFunction) => {
    await this.collector.create(req.body, function (err: Error, post: String) {
      if (err) return next(err);
      res.json(post);
    });
  }

  public updateCollector = async (req: Request, res: Response, next: NextFunction) => {
    this.collector.findByIdAndUpdate(req.params.id, req.body, function (err: Error, post: String) {
      if (err) return next(err);
      res.json(post);
    });
  };

  public deleteCollector = async (req: Request, res: Response, next: NextFunction) => {
    this.collector.findByIdAndRemove(req.params.id, req.body, function (err: Error, post: String) {
      if (err) return next(err);
      res.json(post);
    });
  }
}