// Les Cookies
/*
    Les cookies sont stocker dans le navigateur du client et il sont dispo dans chacune des requête qu'il fait (depuis le Header), si le cookie contient beaucoup de donnée alors la requête sera lourd, c'est pour cette raison qu'il ai conseiler d'y stocker que des petite donnnée ou des ID qui mennent au contenu qui est stocker dans une base de donnée.

    - Créer un Cookie

        res.cookie("userID", "gdq8HJ0");

        Options:
            - path: string = Indique que le cookie sera utilisable uniquement si la route correspond au paht donnée.
            - httpOnly: boolean = Si c'est true le cookie sera accessible uniquement coté serveur.
            - secure: boolean = Créer le cookie uniquement si on est en HTTPS (à mettre a true de préférence)
            - maxAge: Définit une Date d'expération (en mili seconde) 


    - Récupérer un Cookie
    
        console.log(req.headers.cookie); 
        console.log(req.cookies);

        Ceci retourne une chaine de caractère, pour l'avoir sous forme d'objet on peut utiliser "cookie-parser".
    

    - Supprimer un Cookie
        res.clearCookie("userID");


    - cookie-parser

        Grâce à "cookie-parser" on a accès au cookie directement sur "req", ce middleware propose aussi de pouvoir signer des cookie, de cette façon si on à pas la clé on ne poura pas les récupérer.

        // Middleware 
        app.use(cookieParser("maCléSecret")); // Ceci est une clé secret

        res.cookie("maCléSecret", "Contenu du cookier signé", { signed: true });
        console.log(req.signedCookies); // { signerCookie: 'Contenu du cookier signé' }
*/    


// Les Sessions
/*
    Les sessions peuvent contenir beaucoup plus d'information que les cookie, et ces infos sont généralement enregistré dans une base de donnée (par défaut il sont enregistrer dans la mémoire du serveur, donc si on éteint le serveur tout sera perdu), l'id de la session 
    (req.sessionID) est mis dans un cookie qui lui sera présent sur l'objet "req" et ceux à chaque requête, et cette id va par la suite être utilisé pour récupérer les donnée qui sont dans la DB.

    Syntaxe
        app.use(session({...options});


    Les Options dispo:
        - secret: string = Clé secret du cookie, car le cookie qui garde l'id de la session est signé.

        - name: string = Cette option permet de définir le nom du cookie (par défaut "connect.sid").

        - resave: boolean = Cette option force la re-sauvegarde de la session dans la DB (ou store) à chaque requête, même si elle n'a pas été modifiée (on met généralement false).

        - saveUninitialized: boolean = Si après la création de la sessions, celle ci n'a pas été modifier alors on ne la sauvegarde pas, on met généralement "false" mais parfois ca peut être utils de mettre "true", par exemple pour compter le nombre de fois que le user fait une requête (comme dans l'exemple), https://codehunter.cc/a/express/when-to-use-saveuninitialized-and-resave-in-express-session.

        - store = Indique l'endroit ou sont souvegarder les sessions, par défaut dans "MemoryStore" donc la mémoire.

    
    Les méthodes/propriété dispo:
        - req.session.cookie = Récupère le cookie dans le quel l'id de la sessions est enregistrer.
        - req.session.regenerate() = Recréer une nouvelle session avec un nouvel id pour la requête entrante.
        - req.session.destroy() = Cette méthode supprime la session.
        - req.session.reload() = La méthode reload() va recharger la session depuis le store et regénérer l'objet req.session
        - req.session.save() = Sauvegarder la session dans le store/DB, elle est toujours appelée à la fin d'une requête HTTP mais elle est utils si on veut effectuer une action personnaliser.


    Connexion à une BD
        Dans notre middleware il faut ajouter une clé "store" qui va contenir un document de la collection, et ce document prend 2 propriété qui sont "mongoUrl" et "ttl", l'une prend l'url de la DB ou seront stocker les sessions et l'autre un temps d'expiration (en seconde) dans le cas ou cette sessions n'est plus utilisé.

        A savoir, il est recommandé de mettre le même temps d'expiration pour le cookie et le "ttl" du store.


    Comment ça marche ?

        étape 1 - Un id de session unique est généré et ajouté sur l'objet Request (req) sous le nom de "req.sessionID".
        étape 2 - Cet id est stocké dans un cookie. Ce cookie est signé et son nom par défaut est "connect.sid".
        étape 3 - Un objet req.session est créé.
        étape 4 - Suivant l'option saveUninitialized, l'objet de la session (req.session) est sauvegardé dans la DB ou le store par défaut.
*/

const express = require("express");
const path = require("path");
const app = express();

// const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// app.use(cookieParser("maCléSecret"));
app.use(session({
    secret: "maCléSecret", // Clé secret pour le cookie
    resave: false, // Ne sauvegarde pas si on a pas apporté de chagement à la sessions
    saveUninitialized: true, // Si après la création de la sessions, celle ci n'a pas été modifier alors on ne la sauvegarde pas
    cookie: {
        httpOnly: true,
        maxAge:  60 * 60 * 24 * 15 * 1000 // 30 jours (en mili-seconde donc * 1000)
    },
    // Sauvegarde des sessions dans une DB
    store: MongoStore.create({
        mongoUrl: 'mongodb://Florian:azerty@localhost:27017/dyma?authSource=admin', // La ou sera sauvegarder les sessions
        ttl: 60 * 60 * 24 * 15 // Sera supprimer au bout de 15 jours (en seconde)
    })
}));

app.get("/", (req, res) => {

    console.log(req.session);
    console.log(req.session.id, req.sessionID);

    /*
        Exemple de compteur de visite d'un utilisateur (pour ça il faut mettre saveUninitialized à true).
        Ici on ajoute une propriété qu'on nomme "views" qui va incrémenter de 1 le nombre de visite si la sessions existe déjà sinon on initilise "views" à 1.
    */
    if (req.session.views) {
        req.session.views += 1;
    } 
    else {
        req.session.views = 1;
    }
    console.log(req.session.views);

    res.render("index");
})

app.listen(3000);