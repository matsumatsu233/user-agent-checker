const moment = require("moment");
const MongoClient = require('mongodb').MongoClient;

module.exports.start = (server) => {
  server.get("/api/test", (req, res) => {
    const userAgent = req.headers['user-agent'];
    const currentTime = moment().format();
    const client = new MongoClient(process.env.MONGODB_URI);

    client.connect((err) => {
      const db = client.db(process.env.MONGODB_NAME);
      const collection = db.collection('useragents');
      collection.insertOne({
        userAgent,
        created: currentTime
      }, (err, result) => {
        client.close();
        res.json({
          err,
          result,
          userAgent,
          currentTime
        })
      });
    });

  });
}