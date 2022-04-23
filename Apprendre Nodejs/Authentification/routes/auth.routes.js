const router = require("express").Router();

const { sessionNew, sessionCreate, sessionDelete } = require("../controllers/auth.controller");

router.post("/signin", sessionNew);
router.get("/signin/form", sessionCreate);
router.get("/signout", sessionDelete);

module.exports = router;