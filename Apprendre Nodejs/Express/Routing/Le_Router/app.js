/*
    - express.Router()
    
        C'est une fonction constructeur (l'ancêtres des classes) qui retourne une instance sur la quel on peut appliquer toutes les fonctions en rapport avec les routes comme: les méthodes get-put etc, "use()", "param()", "all()", "route()". Et cette instance la est utilisé en interne par express pour tout ce qui routing, mais on peut aussi s'en servire nous même, notament pour mieux s'apparer notre code.
*/

const express = require("express");
const app = express();
const routerUsers = require("./routes/user");
const routerPosts = require("./routes/post");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", routerUsers);
app.use("/api/post", routerPosts);

app.listen(3000);