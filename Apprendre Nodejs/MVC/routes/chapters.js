const router = require("express").Router();

const { createChapter ,getAllChapters, getOneChapter, chapterDelete } = require("../controllers/chapter.controllers");

router.post("/", createChapter);
router.get("/", getAllChapters);
router.get("/:chapterID", getOneChapter);
router.delete("/:chapterID", chapterDelete);

module.exports = router;