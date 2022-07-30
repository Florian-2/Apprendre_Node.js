const http = require("http");
const https = require("https");
const app = require("../app");
const path = require("path");
const fs = require("fs");

// Par défaut les navigateurs sont sur du HTTP, donc en faisant ceci toute requete HTTP sera rediriger vers le serveur HTTPS
http.createServer((req, res) => {
    console.log(1);
    res.writeHead(301, { Location: `https://${ req.headers.host }${ req.url }` })
    res.end();
}).listen(80);

const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, "../ssl/local.key")),
    cert: fs.readFileSync(path.join(__dirname, "../ssl/local.crt"))
}, app);

// port 80 -> http
// port 443 -> https
server.listen(443);