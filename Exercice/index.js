const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    let file;

    if (req.url === "/") {
        file = fs.readFileSync("./index.html");
    }
    if (req.url === "/style.css") {
        file = fs.readFileSync("./style.css");
    }

    res.end(file);
});

server.listen(3000);