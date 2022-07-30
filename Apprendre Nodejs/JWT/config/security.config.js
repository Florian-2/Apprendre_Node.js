exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        // res.status(403).json({ message: "(Forbidden) Accès non autorisé." });
        res.redirect("/");
    }
}

// Autre exemple de guard
exports.ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.roles.includes("ADMIN")) {
        next();
    }
    else {
        // res.status(403).json({ message: "(Forbidden) Vous n'êtes pas administrateur." });
        res.redirect("/");
    }
}