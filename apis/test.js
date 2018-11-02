module.exports.start = (server) => {
  server.get("/api/test", function(req, res) {
    res.json({ test: "this is test api."});
  });
}