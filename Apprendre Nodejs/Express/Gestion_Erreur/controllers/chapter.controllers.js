const Chapter = require("../databases/models/chapter");

exports.getAllChapters = async (req, res, next) => {
    try {
        const myError = req.foo.email; // foo.email n'existe pas donc lève une erreur qui sera capturé par le catch()

        const chapters = await Chapter.find().exec();
        res.render("index", { chapters });
    } 
    catch (error) {
        next(error); // Est envoyer dans la stack d'erreur et passe dans le middleware d'erreur qu'on à créer dans la page "app.js", il on ne créer par notre propre middleware d'érreur il utilisera celui par défaut fourni par express
    }
}

exports.getAllChapters = (req, res) => 
{
    const myError = req.foo.email; // foo.email n'existe pas donc lève une erreur qui sera envoyer dans la stack d'erreur

    getChapters()
    .then((chapters) => res.render("index", { chapters }))
    .catch((err) => console.log(err))
}