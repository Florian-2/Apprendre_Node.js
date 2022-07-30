const router = require("express").Router();

const { userCreate, formNew } = require("../controllers/user.controller");

router.post("/create-user", userCreate);
router.get("/form-new-user", formNew);

module.exports = router;