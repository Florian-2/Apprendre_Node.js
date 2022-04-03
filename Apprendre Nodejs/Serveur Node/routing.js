const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {    
    const url = req.url;
    let statusCode = 200;
    let file;
    
    // Routes
    if (url === "/") {
        file = fs.readFileSync("./pages/index.html");
    }
    else if (url === "/user") {
        file = fs.readFileSync("./pages/user.html");
    }
    else {
        statusCode = 404;
        file = fs.readFileSync("./pages/not-found.html");
    }

    // Header
    res.writeHead(statusCode, {
        "Content-type": "text/html"
    });

    res.end(file);
})

server.listen(8080);