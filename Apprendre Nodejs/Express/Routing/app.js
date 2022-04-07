const express = require("express");
const app = express();


/*  Les paramètres de requête

    - app.param(<paramètre>, <middleware>) = Le middleware sera déclenché à chaque fois que le paramètre donné (ici "userID") est passer dans une route. À savoir, on peut lui donner un tableau avec tous les paramètres qu'on souhaite surveiller, dans ce cas le middleware sera exécuter pour chaque paramètre donc il faut un middleware asser générique.

    - name = Fait référence au nom du paramètre.
    - value = Fait référence a la valeur du paramètre.
*/
app.param("userID", (req, res, next, value, name) => {
    console.log(name, value);

    if (value < 10) {
        // Récupération du user dans la base de donnée
        console.log("l'utilisateur à bien été trouvé dans la DB.");
        return next(); 
    }

    res.status(404).json({ message: "Utilisateur introuvable." });
})

app.get("/user/:userID", (req, res) => {
    res.send(req.params.userID);
})

app.get("/user/:userID/post/:postID", (req, res) => {
    res.send(req.params);
})




/* app.route()

    Permet de gérer plusieurs type de requête sur une route en particulier.

    Ca évite ce genre de chose (même si ce n'est pas une mauvaise chose de faire ça): 

        app.get("/post/:postID", (req, res) => {
            res.send("Obtention");
        })   

        app.post("/post/:postID", (req, res) => {
            res.send("Modification");
        })
        
*/
app.route("/post/:postID")
    .get((req, res) => {
        res.send("Obtention");
    })    
    .post((req, res) => {
        res.send("Modification");
    })
    .delete((req, res) => {
        res.send("Suppression");
    })





/* Les paterne dispo sur les routes

    - [<path>] = Le middleware lié à cette route sera exécuter si le match avec l'une des options qui est dans le tableau.
    - <caractère>? = Rends la lettre qui est placer devant le "?" optionel.
    - <caractère>+ = La lettre qui est devant le "*" peut être présente plusieurs fois.
    - <caractère>*<caractère> = A la place de "*" on peut y mettre n'importe quoi.
*/

// []
app.get(["/", "/index", "/home"], (req, res) => {
    res.send(req.url);
})

// ?
app.get("/users?", (req, res) => {
    res.send(req.url);
})

// +
app.get("/fooa+", (req, res) => {
    console.log(req.url); // /fooaaaaa
    res.send(req.url);
})

// *
app.get("/foo*bar", (req, res) => {
    console.log(req.url); // /fooFlorianbar
    res.send(req.url);
})

app.listen(3000);