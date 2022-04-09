const mongoose = require("mongoose");

/* Les schémas 

    Les schéma représente ceux à quoi doit ressemblé nos collection dans MongoDB, on peut spécifier le type d'un champ (string, number...), on peut y insérer des règle de validation etc...

    Comment ça marche ?
        Au moment on l'on va essayer d'insérer ou de récupérer des donnée depuis notre DB, mongoose va convertir chaque objet en fonction de ce qu'on lui a demender dans le "Schema", de base tout est sous forme de String, par exemple ici "index" doit être de type "Number" il va donc passer du type String à Number.


    Les options de type disponible:

        - required : Champs obligatoir.
        - default : permet de définir une valeur par défaut pour le champ si il n'est pas obligatoir.
        - select : permet de définir les propriétés retournées par défaut par vos requêtes.
        - validate : permet de définir une fonction utilisée comme validateur pour votre propriété.
        - get : permet de définir une fonction utilisée comme getter pour la propriété.
        - set : permet de définir une fonction utilisée comme setter pour la propriété.
        - index : permet de définir un index MongoDB pour cette propriété.
        - unique : permet de définir un index unique MongoDB pour cette propriété.


    Exemple:
        const schema = mongoose.Schema({
            test: {
                type: String,
                index: true,
                default: 'ma valeur par défaut'
            },
            test2: String,
            test2: {
                type: String,
                validate: [isEmail, "email non valide"]
            }
        });
*/
const schema = mongoose.Schema;

const chapterSchema = schema({
    id: schema.Types.ObjectId, // Indique que ce champ est de type "ObjetId", ce champ va donc contenir l'id du document qui est automatique attribué par MongoDB
    title: {
        type: String,
        required: true
    },
    nbOfLessons: Number,
    index: Number,
    active: Boolean,
    infos: schema.Types.Mixed // mongoose ne fera pas de convertion de type, on peut donc y mettre des élément de tout type.
})

module.exports = chapterSchema;