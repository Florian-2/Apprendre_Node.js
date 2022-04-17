/* Gérer les erreurs 

    Ils existent 2 types d'erreurs, les erreur synchone et asynchrone.

    Avec express ils existent une stack qui gère que les erreurs, quand une erreur est levé dans un middleware ou autre cette erreur est mise dans la stack qui gère les erreurs, mais que si cette erreur est synchrone, si elle est asynchrone il faut qu'on place nous même l'erreur dans la stack.

    A quoi ressemble un middleware d'erreur ?
        (err, req, res, next) => {
            next(err); // Passe au midleware d'erreur suivant (qui est le middlware natif d'express)
        )

    A savoir:
        Express a un middleware par défaut qui fait parti de la stack qui gère les erreur, ce middleware va principalement faire un console.log de l'erreur et retourner une réponse.
*/

const express = require("express");
const app = express();
const path = require("path");

require("./databases/index");
const routing = require("./routes/index");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routing);

/* Gère les erreurs synchone

    Ce middleware est place dans la stack qui gère les erreur et quand on aura une erreur, ce middleware qui sera exécuté.

    Ici au lieu de passer au middleware natif d'express on met fin à la req en envoyant le message de l'erreur.
*/
app.use((err, req, res, next) => {
    console.log(err);
    // next(err); Si on fait ça il passera au middleware suivant (qui est le middleware d'erreur natif)
    res.status(500).send(err.message);
})

app.listen(3000);