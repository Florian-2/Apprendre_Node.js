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





