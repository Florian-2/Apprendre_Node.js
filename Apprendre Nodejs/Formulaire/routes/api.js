const express = require("express");
const chapters = require("./chapters");

const router = express.Router();

router.use("/chapters", chapters);
// router.use("/lessons", chapters);

module.exports = router;