const { findUserByEmail } = require("../queries/user.queries");

exports.signForm = (req, res, next) => {
    res.render("signin", { error: null });
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email) { 
        return res.status(400).json({ message: "Email manquant"});
    }
    if (!password) { 
        return res.status(400).json({ message: "Mot de passe manquant"});
    }

    try {
        const user = await findUserByEmail(email);

        if (user) {
            const math = await user.comparePassword(password);

            if (math) {
                req.login(user);
                res.redirect("/protected");
            } 
            else {
                res.render("signin", { error: "Mot de passe incorrect" });
            }
        }
        else {
            res.render("signin", { error: "Utilisateur introuvable" });
        }
    } 
    catch (error) {
        next(error);
    }
}

exports.signout = (req, res, next) => {
    req.logout();
    res.redirect("/");
}