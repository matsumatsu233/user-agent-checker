const MongoClient = require('mongodb').MongoClient;

module.exports.start = (server) => {
  server.get("/api/list", (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);

    client.connect((err) => {
      const db = client.db(process.env.MONGODB_NAME);
      const collection = db.collection('useragents');
      collection.find({}).sort({ created: -1 }).toArray((err, docs) => {
        client.close();
        res.json({ err, docs });
      });
    });
  });
}