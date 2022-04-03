/*
    - const app = express() 
        Appel une fonction nommé "createApplication()" qui est dans le fichier "node_modules\express\lib\express.js"

    - res.send()
        Est un raccourci pour res.setHeaders(), res.write() et res.end(),  
        cette méthode va automatiquement détecter le type du body de la réponse passé en paramètre a "send()" et définir le "Content-Type" (par exemple: text/html; charset=utf-8), et elle va finir par envoyer le paramètre passé a "send()" comme body via la méthode "res.write()" et appeller "res.end()" pour clore la réponse.

    - app.listen(3000);
        Appel "http.createServer()" du module "http" et cette fonction se trouve dans "node_modules\express\lib\application.js"
*/

const express = require("express");
const app = express() 

app.get("/", (req, res) => {
    res.send("Hello world !");
})

app.listen(3000);