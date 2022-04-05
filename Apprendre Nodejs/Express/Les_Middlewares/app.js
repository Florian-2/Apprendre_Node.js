/*
    Un Middleware c'est quoi ?
        C'est une fonction qui peut prendre en paramètre le "req", "res" et "next()", elle peut modifier les objets "req" et "res", passer au layer (app.<...>) suivant, peut terminer une requête via res.send() (ou autre). 
        A savoir si on utilise pas le "next()" dans le middleware il faut obligatoirement retourner une réponse via "res.<...>" sinon la requête ne se terminera jamais.
        

    - app.use(<path?>, <...middleware>)
        Cette méthode ne fait pas attention au verbe (get, put etc...) elle regarde uniquement la path, son middleware sera donc exécuté quelque soit le verbe utilisé. A savoir, on peut ne pas lui donnée d'argument "path", dans ce cas son middleware sera exécuter quelque soit le verbe et le path. On peut également lui donner plusieur middlewares (sous forme de tableau ou séparément).


    // Exécuter un middleware sur toutes les requêtes.
        app.use(middleware);

    // Exécuter un middleware sur un path précis.
        app.use('/bar', middleware);

    // Exécuter un middleware sur une méthode (verbe) précise.
        app.get('*', middleware);

    // Exécuter un middleware sur une méthode (verbe) et un path précis.
        app.post("/login", middleware)
*/

const express = require('express');
const path = require('path');
const app = express();

/* Exemple de base

// Option 1
app.use((req, res, next) => {
    console.log("middleware 1 (sans path)");
    req.me = "Florian"; // Ajoute une propriété "me" sur le "req"
    next(); // Va passer à "app.get()"
})

 Option 2
const monMiddleware = (req, res, next) => {
    console.log("middleware 1 (sans path)");
    req.me = "Florian";
    next();
}
app.use(monMiddleware);
*/


/* Cas concret
const getCurrentUser = (req, res, next) => {
    req.user = {
        id: 1,
        pseudo: "Flo02+",
        authenticated: true
    }
    next(); // Passe a "isAuthenticated"
}

const isAuthenticated = (req, res, next) => {
    if (req.user.authenticated) {
        console.log("Autorisation ok !");
        return next(); // Passe a "app.get()" et "return" met fin à la fonction
    }
    res.status(401).send("Utilisateur non authentifié");
}

// Ceci est un layer
app.use(getCurrentUser, isAuthenticated);

// Ceci est une route
app.get('/me', (req, res) => {
    // console.log(req.me); // Florian
    res.json({ user: req.user });
});
*/



/* Middleware Static

    - express.static(<...path>) = Retourne des fichiers, cette fonction peut prendre un ou plusieurs paramètres via un tableau, cette fonction retourne un middleware.

    A chaque fois que l'on va essayer de récupérer un fichier (image, video, css, pdf etc...), le middleware "static" fourni par express va allez voir le dossier qu'on lui a donner (ici "public" et "public/css") et chercher le fichier demandé puis nous le retourner via "res.sendFile()".

    A savoir, cette fonction sait qu'on veut récupérer un fichier grâce au point et l'extension (".png" par exemple)
*/
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000);