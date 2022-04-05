/*
    res et res c'est quoi ?
        "req" représente la requête et "res" la réponse et ce sont des event emmiter, on peut donc utilisé le ".on()" et le ".emit()".

    - const app = express() 
        Appel une fonction nommé "createApplication()" qui est dans le fichier "node_modules\express\lib\express.js"

    - res.send(<data?>)
        Est un raccourci pour res.setHeaders(), res.write() et res.end(),  
        cette méthode va automatiquement détecter le type du body de la réponse passé en paramètre a "send()" et va définir le "Content-Type" (par exemple: text/html; charset=utf-8), et elle va finir par envoyer le paramètre passé a "send()" comme body via la méthode "res.write()" et appeller "res.end()" pour clore la réponse. Par défaut si on envoie une simple chaine de caractère elle sera interpréter comme du HTML, si on veux changer ça il faut simplement passer le "content-type" en "text/plain" via "res.writeHead()" ou "res.set("content-type", "text/plain")".

    - res.json(<data>)
        Permet de envoyer des donnée au format JSON, chose que "res.end()" peut faire également, elle va explicitement utilise "JSON.stringify()" et passer le "Content-type" en "application/json".

    - res.status(<code>)
        - Définit seulement le statusCode de la réponse mais n'arrête pas la requête et ne retourn rien contrairement à "res.sendStatus()"

    - res.sendStatus(<code>)
        Permet d'envoyer une réponse toute faite en fonction du code donnée en paramètre, si on lui donne "res.sentStatus(404)" il envera une erreur de type 404 avec une phrase prédéfinie, ici ça sera "Not Found".

    - res.sendFile(<path>, (err) => {})
        Retourn un fichier (souvent html), le chemin doit obligatoirement etre absolu.

    - res.set(<header>, <value>)
        res.set('Content-Type', 'text/plain'); Permet de paramétrer le Header comme "res.setHeader()" et "set.writeHead()", res.set() est plus simple d'utilisation et on peut ajouter plusieur règle au Header si on passe un objet avec des key-value.

    - res.append(<header>, <value>)
        res.append('Set-Cookie', 'a=b; Path=/; HttpOnly') Permet d'AJOUTER (et non définir) une règle au Header, il faut donc l'utilisé après un "res.set()"

    - app.listen(3000);
        Appel "http.createServer()" du module "http" et cette fonction se trouve dans "node_modules\express\lib\application.js"
*/

const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {    
    // res.send("<h1>Hello world !</h1>");
    // res.send({ mess: "Hello World" });
    // res.json({ mess: "Hello World" })
    // res.sendStatus(404); // équivalent de res.status(404).send('Not Found')

    // res.set("Content-type", "text/html; charset=utf-8");
    // console.log(res.get("Content-type")); // "text/html; charset=utf-8"

    res.sendFile(path.join(__dirname, "index.html"), (err) => {
        if (err) 
            res.sendStatus(500);
        else 
            console.log("Fichier envoyé");
    });
})

app.listen(3000);