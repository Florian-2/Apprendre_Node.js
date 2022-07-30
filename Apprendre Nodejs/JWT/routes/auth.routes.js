const router = require("express").Router();

const { signForm, signin, signout } = require("../controllers/auth.controller");

router.post("/signin", signin);
router.get("/signin/form", signForm);
router.get("/signout", signout);

module.exports = router;