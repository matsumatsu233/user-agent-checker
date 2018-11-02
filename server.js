const express = require('express');
const next = require('next');
const fs = require('fs');

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express();

  fs.readdirSync("./apis").forEach(function(file) {
    if (file.substr(-3) == ".js") {
      route = require(`./apis/${file}`);
      route.start(server);
    }
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})