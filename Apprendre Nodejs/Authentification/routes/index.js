const router = require("express").Router();
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const { ensureAuthenticated } = require("../config/security.config");

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

// "ensureAuthenticated" est un middleware perso qui projète la route, si on est pas connecter on ne poura pas allez sur cette page
router.get("/protected", ensureAuthenticated, (req, res) => {
    res.render("protected", { user: req.user });
})

router.get("/", (req, res) => {
    console.log(req.user);
    res.render("index", { user: req.user });
})

module.exports = router;