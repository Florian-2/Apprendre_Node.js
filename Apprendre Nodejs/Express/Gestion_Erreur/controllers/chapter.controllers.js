/*
    Les fichiers controller sont là pour gérer la partie logique d'une route.
*/

const Chapter = require("../databases/models/chapter");
const { createChapter, getChapters, getChapterById, deleteChapterById } = require("../queries/chapter.queries");

// exports.getAllChapters = async (req, res) => {
//     try {
//         const chapters = await getChapters();
//         res.render("index", { chapters });
//     } 
//     catch (error) {
//         console.log(error);
        
//     }
// }
exports.getAllChapters = (req, res) => 
{
    const myError = req.foo.email; // foo.email n'existe pas donc lève une erreur

    getChapters().then((chapters) => {
        res.render("index", { chapters });
    })
}

exports.getOneChapter = async (req, res) => {
    try {
        const chapterID = req.params.chapterId;
        const chapter = await getChapterById(chapterID);
        res.render("chapter", { chapter });
    } 
    catch (error) {
        console.log(error);
    }
}

exports.deleteChapter = async (req, res) => {
    try {
        const chapterID = req.params.chapterId;
        await deleteChapterById(chapterID);
        const chapters = await getChapters();
        res.render("index", { chapters });
    } 
    catch (error) {
        console.log(error);
        
    }
}

exports.createChapter = async (req, res) => {
    try {
        await createChapter(req.body);
        res.redirect('/');
    } catch(e) {
        const errors = Object.keys(e.errors).map( key => e.errors[key].message );
        res.status(400).render('form', { errors });
    }
}

exports.addChapter = async (req, res) => {
	try {
		res.render('form');
	} catch(e) {
		console.error(e);
	}
}