const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { app } = require("../app");
const Users = require("../databases/models/user.model");
const { findUserByEmail } = require("../queries/user.queries");

app.use(passport.initialize());
app.use(passport.session());

/*
    Cette méthode est appelé seulement au moment de l'authentification et elle va simplement stocker des infos de l'utilisateur dans la session, ici on stocke que l'id.

    done() ?
        Cette fonction là prend en premier paramètre l'erreur et l'utilisateur en second paramètre, et elle à pour objectif de placer notre utilisateur sur l'objet "req" (req.user).
*/
passport.serializeUser((user, done) => {
    // L'id de l'utilisateur sera stocker dans la session et l'id de cette sessions sera stocker dans un cookie
    done(null, user._id);
})

/*
    Cette méthode est appelé à chaque fois qu'on à besoin de récupérer l'utilisateur, le premier paramètre fait référence au data qu'on à sérialize (ici l'id du user) dans la méthode "serializeUser".
*/
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findById(id).exec();
        done(null, user);
    } 
    catch (error) {
        done(error, null);
    }
})

/*
    La stratégie est utilisé au moment de l'authentification et elle à pour mission d'identifier l'utilisateur via un "username" ou "email" et de vérifier que les infos du formulaire correspondent bien au infos stocker dans la DB.

    passport.use()
        Prend en premier paramètre le nom de notre stratégie (qui sera utilisé sur les routes) et la stratégie en elle même en second param.

    "LocalStrategy" prend une fonction de vérification qui elle même prend 3 paramètre, les 2 premiers sont récupérer sur l'objet "req.body", par défaut il cherche un "req.body.username" et non l'addresse mail, pour changer ça il y à l'option "usernameField" et sa valeur prend le nom du champ qui remplacera le "username" (ici c'est "email"), et pour infso on peut faire la même chose avec le mot de passe (ici pas besoin)
*/
passport.use('local', new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
        const user = await findUserByEmail(email);
        console.log(user);

        if (user) {
            const mathPassword = await user.comparePassword(password);

            if (mathPassword) {
                done(null, user);
            } 
            else {
                // pas d'erreur, pas de user, un message d'erreur qui sera utiliser côté front
                done(null, false, { message: "Mot de passe incorrect." })
            }
        }
        else {
            // pas d'erreur, pas de user, un message d'erreur qui sera utilisé côté front
            done(null, false, { message: "Vous n'êtes pas inscrit." });
        }
    } 
    catch (error) {
        done(error);
    }
}))



/* Récapitulatif des étape lors d'un connexion

    1 - L'utilisateur s'authentifie avec une stratégie (identifiant et mot de passe, Facebook, Google, Github, Twitter… ou une des 500 stratégies disponibles)

    2 - Si l'authentification réussie et que l'utilisateur est récupéré dans la base de données, Passport va exécuter la fonction de sérialisation que vous avez définie.

    3 - Express-session va créer une session et définir un cookie en utilisant les options qu'on à définie (dans le fichier /config/session.config) en utilisant "req.session"

    4 - Passport va sérialiser les donnée qu'on à passer en second paramètre de la fonction "done()" dans la méthode "serializeUser()" et il va stocker ces donnée dans la session dans une clé nommé "user"

    4 - mongo-connect va ensuite sauvegarder la session en base de données indiqué.
*/