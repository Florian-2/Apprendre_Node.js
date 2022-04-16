/*
    Les fichiers controller sont là pour gérer la partie logique d'une route.
*/

const Chapter = require("../databases/models/chapter");
const { createChapter, getChapters, getChapterById, deleteChapterById } = require("../queries/chapter.queries");

exports.getAllChapters = async (req, res) => {
    try {
        const chapters = await getChapters();
        res.render("index", { chapters });
    } 
    catch (error) {
        
    }
}

exports.getOneChapter = async (req, res) => {
    try {
        const chapterID = req.params.chapterID;
        const chapter = await getChapterById(chapterID);
        res.render("chapter", { chapter });
    } 
    catch (error) {
        
    }
}

exports.deleteChapter = async (req, res) => {
    try {
        const chapterID = req.params.chapterID;
        await deleteChapterById(chapterID);
        const chapters = await getChapters();
        res.render("index", { chapters });
    } 
    catch (error) {
        
    }
}

exports.createChapter = async (req, res) => {
    try {
        await createChapter(req.body);
        res.redirect("/");
    } 
    catch (error) {
        const errorFieldTitle = err.errors["title"].message;
        const errorFieldLessons = err.errors["nbOfLessons"].message;

        res.status(400).render("form", { errTitle: errorFieldTitle, errLessons: errorFieldLessons });
    }
}