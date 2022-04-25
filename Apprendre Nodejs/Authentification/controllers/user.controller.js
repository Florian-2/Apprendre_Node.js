const { createUser } = require("../queries/user.queries");

exports.formNew = (req, res) => {
    res.render("signup", { error: null });
}

exports.userCreate = async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        // Connexion
        req.login(user, (err) => {
            if (err) 
                next(err);
        });

        res.redirect("/");
    } 
    catch (err) {
        console.log(err);
        res.render("signup", { error: err.message });
    }
}