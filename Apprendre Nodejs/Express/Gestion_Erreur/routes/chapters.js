const router = require("express").Router();

const { createChapter, getAllChapters, getOneChapter, deleteChapter, addChapter } = require("../controllers/chapter.controllers");

router.get("/", getAllChapters);
router.get('/add', addChapter);
router.get("/:chapterId", getOneChapter);
router.post("/", createChapter);
router.get("/delete/:chapterId", deleteChapter);

module.exports = router;