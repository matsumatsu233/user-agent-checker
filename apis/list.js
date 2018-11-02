module.exports.start = (server) => {
  server.get("/api/list", function(req, res) {
    res.json({ list: "this is list api."});
  });
}