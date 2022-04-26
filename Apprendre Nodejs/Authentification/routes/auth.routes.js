const router = require("express").Router();
const passport = require("passport");

const { sessionNew, sessionCreate, sessionDelete } = require("../controllers/auth.controller");

/*
    passport.authenticate()
        Cette méthode prend en paramètre le nom de la stratégie qu'on souhaite utiliser pour cette route et en second paramètre une fonction (ou un objet si on ne fait pas de gestion d'erreur, voir exemple 1) qui elle prend paramètre l'erreur, l'utilisateur, et les messages d'erreur dans l'objet "info", elle à donc la même signature que la fonction "done()" vu qu'en réalité c'est cette fonction "done()" qu'on met dans "passport.authenticate" par ce que si on met une fonction à la place d'un objet on écrase la fonction de base qui gère "done()"

        A savoir
            En interne cette méthode à besoin de "req", "res" et "next" c'est pour ça qu'on invoque la méthode 
            .authenticate() en lui passent ces 3 objets là.

        Exemple 1
            router.post("/signin", passport.authenticate("local", {
                successRedirect: "/",
                failureRedirect: "/auth/signin/form"
            }));

*/
router.post("/signin", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        // Dans le cas d'un "done(err)"
        if (err) {
            next(err);
        }
        // Dans le cas d'un "done(null, false, { message: "..." })"
        else if (!user) { 
            res.render("signin", { error: info.message })
        }
        // Dans le cas d'un "done(null, user);" donc si tout ces bien passé
        else {
            // "login()" va faire appele à la méthode "serializeUser()" 
            req.login(user, (err) => {
                if (err) 
                    next(err);

                res.redirect("/");
            });
        }
    })(req, res, next)
});
router.get("/signin/form", sessionNew);
router.get("/signout", sessionDelete);

module.exports = router;