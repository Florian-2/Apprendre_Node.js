/* 
    - app.set()
        Permet de définir des éléments de configuration pour notre application express.

    "views" est une propriété reservé d'express (contrairement à notre "foo") et elle sert à savoir ou est situé le dossier qui contient les templates.
*/

const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

// Exemple
app.set("foo", "Ceci est la valeur de la propriété foo");
console.log(app.get("foo")); // Ceci est la valeur de la propriété foo


app.set("views", path.join(__dirname, "views"));
/*
    A chaque fois que express va "res.render()" un fichier avec l'extension ".toto" il fera appel à notre "engine"
    
    - path = Correspond au chemin du fichier qu'on essai de "res.render()".
    - options = Correspond au data qu'on va passez lors de l'appel de la fonction "res.render(<path>, <data>)"
    - callback() = Fonction qui doit contenir une erreur en premier paramètre (si pas d'erreur on met 'null') et en second paramètre on met le template à envoyer SI il n'y a pas d'erreur.
*/
app.engine("toto", (path, options, callback) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) 
            callback(new Error(err));

        const template = data.replace("%name", options.name);
        callback(null, template);
    })
})

app.get("/", (req, res) => {
    // "render" va allez chercher dans "views" un fichier nommé "index.toto", et l'objet avec la clé "name" sera stocké dans "options"
    res.render("index.toto", { name: "Florian" });
})

app.listen(3000);