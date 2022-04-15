const Chapter = require("../databases/models/chapter");

exports.getAllChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find().exec();
        res.render("index", { chapters });
    } 
    catch (error) {
        
    }
}

exports.getOneChapter = async (req, res) => {
    try {
        const chapterID = req.params.chapterID;
        const chapter = await Chapter.findById(chapterID).exec();
        res.render("chapter", { chapter });
    } 
    catch (error) {
        
    }
}

exports.deleteChapter = async (req, res) => {
    try {
        const chapterID = req.params.chapterID;
        await Chapter.findByIdAndDelete(chapterID).exec();
        const chapters = Chapter.find().exec();
        res.render("index", { chapters });
    } 
    catch (error) {
        
    }
}

exports.createChapter = async (req, res) => {
    // { title: <string>, nbOfLessons: <number>, active: <string> }
    try {
        const body = req.body; 
        await Chapter.create({ ...body, active: body.active ? true : false });
        res.redirect("/");
    } 
    catch (error) {
        const errorFieldTitle = err.errors["title"].message;
        const errorFieldLessons = err.errors["nbOfLessons"].message;

        res.status(400).render("index", { errTitle: errorFieldTitle, errLessons: errorFieldLessons });
    }
}