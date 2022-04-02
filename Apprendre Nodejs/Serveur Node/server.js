const http = require("http");

/* Créer un serveur

    "createServer" créer une instance de la classe "http.Server" et cette classe est basé sur un système d'évènement (EventEmitter, comme c'est souvent le cas avec node.js), La fonction passée à "createServer" sera appelé lorsque node.js aura récupérer la requête et qu'il exécutera explicitement un "emit('request')".

    // Option 1
    const server = http.createServer((req, res) => res.end());

    // Option 2
    const server = http.createServer();
    server.on("request", (req, res) => res.end("Fin"));


const server = http.createServer((req, res) => {
    console.log("Requête réceptionnée !");
    res.end("réponse !"); // Coupe la socket qui à été établie entre le client et le serveur
})

server.listen(8080);
*/





/* Les requête/réponse 

    A savoir !
        res.end() peut uniquement prendre des élément de type "string" ou "JSON", si on s'ouhaite return un objet js qui sera perçu comme du json il faut utiliser JSON.strigify().
*/

const server = http.createServer((req, res) => {
    // console.log(req.headers);
    // console.log(req.url);
    
    // Configure le Header de la réponse
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8;',
        // 'Content-Type': 'text/plain; charset=utf-8;',
        // 'Content-Type': 'application/json; charset=utf-8;',
    })

    // HTML
    const html = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <title>Document</title>
        </head>
        <body>
            <h1>Node.js</h1>
        </body>
        </html>
    `
    res.write("<h2>Ceci sera afficher dans la page</h2> ")
    res.end(html);

    // JSON
    // const user = { id: 1, name: "Florian" };
    // res.end(JSON.stringify(user));
})

server.listen(8080);