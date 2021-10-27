var mongoose = require('mongoose');
var collectorSchema = mongoose.Schema({
  name: String,
  owner: String,
  description: String,
}, {
  timestamps: true
});
var collector = mongoose.model('Collector', collectorSchema);

var connectWithRetry = function() {
  return mongoose.connect('mongodb://mongo/simple-crud', function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};

exports.mongoMigration = function() {
  connectWithRetry();
  console.log('Mongo connection succesful');
  mongoose.connection.on('open', function() {
    mongoose.connection.db.dropDatabase();
    collector.create({
      "name": "Test",
      "owner": "DoKM",
      "description": "Testing entry for no reason",
    }, function(err) {
      if (err) console.error('Failed to create start collector', err);
    });
  });
};

exports.getCollectors = async (req, res, next) => {
  await collector.find(function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
};

exports.getCollectorById = async (req, res, next) => {
  await collector.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
};

exports.postCollector = async (req, res, next) => {
  await collector.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

exports.updateCollector = async (req, res, next) => {
  collector.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
};

exports.deleteCollector = async (req, res, next) => {
  collector.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
}
