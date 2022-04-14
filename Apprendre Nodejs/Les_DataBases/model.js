const mongoose = require("mongoose");
const schema = require("./schema")
/* Les models (collection) 

    Les méthodes disponible sur les model:
        - create() : crée un ou plusieurs document, Mongoose va en fait appeler la méthode save sur chaque document

        - countDocuments() : compte les document qui match les conditions passées en premier paramètre.

        - find() : récupère les documents qui match les conditions passées en premier paramètre.
        - findOne() : permet de retrouver le premier document qui match les conditions passées en premier paramètre.
        - findById() : retrouve le document dont l'_id est passé en premier paramètre.

        - updateOne() : met à jour le premier document qui match avec les conditions passées en premier paramètre, avec la mise à jour passée en second paramètre.
        - updateMany() : met à jour tous les documents qui match avec les conditions passées en premier paramètre, avec la mise à jour passée en second paramètre.
        - replaceOne() : remplace un document qui match avec les conditions passées en premier paramètre par un autre document passé en second paramètre.
        - findByIdAndUpdate() : met à jour le document dont l'_id est passé en premier paramètre avec l'update passée en second paramètre.
        - findOneAndUpdate() : met à jour le document qui match les conditions passées passées en premier paramètre.

        - findByIdAndDelete() : supprime le document dont l'_id correspond celui passé en premier paramètre.
        - findOneAndDelete() : supprime le document qui match les conditions passées passées en premier paramètre.
        - deleteOne() : supprime le premier document qui match les conditions passées en premier paramètre.
        - deleteMany() : supprime tous les documents qui match les conditions passées en premier paramètre.


        Les méthode disponible sur les query (requête):
            Quand on fait une requête avec "<model>.find()" par exemple, il retourne un objet de type "Query" et sur cette objet on peut utiliser des différente méthode très pratique, et ces méthode là retourne aussi une objet de type "Query" donc on peut en enchainer plusieurs les une a la suite des autre.

            - sort({ quantity: 1 }) : Permet de trie les document du plus grand au plus petit par rapport à un champ bien précis (ici "quantity"), si on lui donne la valeur "1" le trie se fera par ordre croissante et si c'est "-1" il sera fare par ordre décroissant.
            - skip(2) : Permet de sauter un nombre de documents passés en paramètre (ici on passe les 2 premier document).
            - limit(5) : Permet de limiter le nombre de documents retournés (ici on retourne que 5 document).

            Exemple: 
                Chapter.find().sort({ quantity: 1 }).limit(10).exec()
                  .then((chapters) => console.log(chapters))
                  .catch((err) => console.log(err))


    Les méthodes d'instance

        Comme vu juste au dessus il y a beacoup de méthode dispo mais on peut créer nos propre méthode qu'on poura ensuite utilisé sur les model.

        Syntaxe:
            <schéma>.statics.<ma_méthode>

        Exemple:
            schema.chapterSchema.statics.findByTitle = function (title) {
                return Chapters.findOne({ title })
            }

*/

// Les static
schema.chapterSchema.statics.findByTitle = function (title) {
    return Chapters.findOne({ title })
}

const Chapters = mongoose.model("chapters", schema.chapterSchema);

module.exports.Chapters = Chapters;