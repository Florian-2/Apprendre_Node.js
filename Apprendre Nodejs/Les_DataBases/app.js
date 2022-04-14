const mongoose = require("mongoose");
const model = require("./model");

/* Connexion à une base de données MongoDB 

    Url:
        mongodb://<username>:<password>@localhost:27017/<name_db>?authSource=admin

        Le "authSource=admin" veut dire qu'il doit allez chercher l'utilisateur dans la base de donnée "admin", le port "27017" est utilisé par défaut donc c'est pas obligatoire de le mettre.
*/
mongoose.connect("mongodb://Florian:azerty@localhost:27017/dyma?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connexion établie !");

    model.Chapters.create({
        title: "Les bases de mongoose",
        nbOfLessons: 12,
        active: true
    })

})
.catch((err) => console.log(err))