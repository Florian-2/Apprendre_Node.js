const router = require("express").Router();

const { getAllChapters, addChapter } = require("../controllers/chapter.controllers");

router.get("/sync", getAllChapters);
router.get("/async", getAllChapters);

module.exports = router;