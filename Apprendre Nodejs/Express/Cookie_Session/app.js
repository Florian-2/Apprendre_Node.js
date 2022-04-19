const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser("fjdkslmqfdiop")); // Ceci est une clé secret

app.get("/", (req, res) => {
    /* Créer un Cookie

        res.cookie("userID", "gdq8HJ0");

        Options:
            - path: string = Indique que le cookie sera utilisable uniquement si la route correspond au paht donnée.
            - httpOnly: boolean = Si c'est true le cookie sera accessible uniquement coté serveur.
            - secure: boolean = Créer le cookie uniquement si on est en HTTPS
    */


    /* Récupérer un Cookie
    
        console.log(req.headers.cookie); 
        console.log(req.cookies);

        Ceci retourne une chaine de caractère, pour l'avoir sous forme d'objet on peut utiliser "cookie-parser".
    */
    

    /* Supprimer un Cookie
    
        res.clearCookie("userID");
    */

    /* cookie-parser

        Grâce à "cookie-parser" on a accès au cookie directement sur "req".

        res.cookie("mySignedCookie", "Contenu du cookier signé", { signed: true });
    */    
    console.log(req.signedCookies); // { signerCookie: 'Contenu du cookier signé' }

    res.render("index");
})

app.listen(3000);