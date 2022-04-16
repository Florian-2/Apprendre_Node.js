const router = require("express").Router();

const { createChapter ,getAllChapters, getOneChapter, deleteChapter } = require("../controllers/chapter.controllers");

router.post("/", createChapter);
router.get("/", getAllChapters);
router.get("/:chapterID", getOneChapter);
router.delete("/delete/:chapterID", deleteChapter);

module.exports = router;