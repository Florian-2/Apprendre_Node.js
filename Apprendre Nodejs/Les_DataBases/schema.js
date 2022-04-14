const mongoose = require("mongoose");
const models = require("./model");
 

/* Les schémas 

    Les schéma représente ceux à quoi doit ressemblé nos collection dans MongoDB, on peut spécifier le type d'un champ (string, number...), on peut y insérer des règle de validation etc...

    Comment ça marche ?
        Au moment on l'on va essayer d'insérer ou de récupérer des donnée depuis notre DB, mongoose va convertir chaque objet en fonction de ce qu'on lui a demender dans le "Schema", de base tout est sous forme de String, par exemple ici "index" doit être de type "Number" il va donc passer du type String à Number.

    
    Les types fourni pas mongoose:
        - schema.Types.ObjectId: Indique que ce champ est de type "ObjetId", ce champ va donc contenir l'id du document qui est automatique attribué par MongoDB
        - schema.Types.Mixed: mongoose ne fera pas de convertion de type, on peut donc y mettre des élément de tout type.

        Exemple:
            const lessonSchema = schema({
                title: String,
                infos: schema.Types.Mixed
            })


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


    Les validateur natif dispo:
        Les validateur sont des tableau qui prennent 2 valeur: valeur/condition et la phrase qui sera retourner si la validation échoue.

        Validateut pour les String:
            - minlength : Nombre de caractères minimal
            - maxlength : Nombre de caractères maximal
            - enum : La valeur du champ doit matché avec l'une des valeur du tableau enum
            - match : Regex

        Exemple:        
            const schema = mongoose.Schema({
                vehicle: {
                    type: String,
                    required: [true, "Le titre est requis"],
                    minlength: [3, "3 caractères minimum"],
                    maxlength: [50, "50 caractères maximum"],
                    enum: ["voiture", "scooter"]
                }
            });

    Les validateur personnalisé:
        Les validateur doivent retourner un boolean, on peut lui donnée une fonction synchrone ou asynchrone. A savoir, il existent une fonction "validate()" qu'on peut utiliser sur les document et elle permet d'éxécuter les validateur du schéma.

        Exemple:
            const isEmail = (fieldValue) => /^\S+@\S+\.\S+$/.test(fieldValue);

            const schema = mongoose.Schema({
                phoneNumber: {
                    type: Number,
                    validate: [isEmail(value), "Email invalide"]
                }
            });


    Les index et les vituals
        Les index sont utile si on récupère un document très souvent via l'une des ces propriété, par exemple si on récupère un user via son email on peut mettre un index sur la champ "email" et de cette façon MongoDB sera en mesure de récupérer le document plus rapidement que sans l'index, A savoir, "_id" possèdent un index par défaut.

        Exemple:
            const userSchema = schema({
                email: { type: String, required: true, index: true },
                password: { type: String, required: true }
            }) 
*/


/* Les méthodes d'instance

    Ils existent des méthode utilisable sur les document comment "save()", on peut créer nos propre méthode qu'on poura ensuite utilisé sur les document. A savoir, ils existent la même chose mais sur les model.

    Syntaxe:
        <schéma>.statics.<ma_méthode>

    Exemple:
        <schéma>.methods.findNextChapter = function() {
            return models.Chapters.findOne({index: this.index + 1});
        };
        
        <document>.findNextChapter().exec().then((doc) => console.log(doc));
*/

/* Virtual (propriété virtuelle)

    Les propriété virtuel sont utile si par exemple ont a besoin de concaténer une propriété "firstName" avec un "lastName", 

    Exemple:
        // Création d'une propriété virtuel:
        <schéma>.virtual('fullName').get(function() {
            console.log(this); // "this" représente le document.
            return `${this.firstName} ${this.lastName}`;
        });

        // Utilisation
        console.log(<document>.fullName); Ex: "Florian Sicilia"
*/


/* Les Hook 

    Les hooks sont des évènement qui sont déclencher à un certain moment suivent une action (comme les hooks de Vue.js), par exemple on peux faire une action juste avant qu'un document soit modifier via "pre("update")"

    Comment ça marche ?
        Chaque évènement déclenche une fonction de callback qui prend en paramètre "next" qui est une fonction qui doit être appéler pour passer au évènement suivant (sauf pour post('save') car c'est le dernier event), dans chacune des fonction on peut utilisé le "this" qui fait référence au document.

    Les events dispo:
        - validate: Avant ou après la validation du document par mongoose.
        - update: Avant ou après la modification du document par mongoose.
        - save: Avant ou après l'enregistrement du document dans la db MongoDB.

    - pre(<typeEvent>, <fnCallBack>): La fonction de callback se déclenche juste avant l'évènement en question. 
    - post(<typeEvent>, <fnCallBack>): La fonction de callback se déclenche juste après l'évènement en question. 

    Exemple:
        <schéma>.post("validate", function (doc, next) {
            console.log("Après la validation du document");
            console.log(doc);
        })
*/


/* Les relations entre collections (model)

        Ils existent 2 façon de faire des relation entre les collections.

        - Les documents imbriqués:
            l'imbrication de document consiste juste a mettre un schéma dans un autre, utile si on est sur de ne pas avoir besoin de récupérer le sous schéma indépendament du schéma parent. A savoir, quand on met un schéma dans un autre, MongoDB va ajouter une propriété "_id" dans le sous schéma et ce pour chaque objet de celui-ci, si on a pas besoin d'id on peut ajouter: "_id: false" dans le sous schéma.

            Exemple:
                const lessonSchema = schema({ title: String, duration: Number }, { _id: false }); // Sous schéma

                const chapterSchema = schema({ // Schéma parent
                    title: String
                    active: Boolean,
                    lessons: [lessonSchema] // Tableau d'objet
                })


        - Les références:
            Les référence consiste à mettre l'id d'un document dans une propriété d'un autre document, contrairement au "document imbriqué" on aura 2 collections (ou plus) et donc plusieurs documents, ce qui est une bonne chose si on récupère souvent les "post" sans les "commentaire" (dans le cas d'une relation entre des post et des commentaire), mais si on récupère souvenent/toujours les post AVEC leur commentaire dans ce cas mieux vaut passer la l'architecture des document imbriqué.

            Types.ObjectId / ref ?
                Signifie que ce champ doit être de type "ObjectId", ceux qui veut dire qu'il contiendra un id qui fera référence à un document, et la propriété "ref" va permettre d'indiquer la collection où il faut aller chercher la référence.

            Exemple:
                - Les Schémas:
                    const lessonSchema = schema({
                        title: String,
                        duration: Number,
                        chapter: { type: schema.Types.ObjectId, ref: "chapters" }
                    })
                    const chapterSchema = schema({
                        title: { type: String, required: true },
                        nbOfLessons: { type: Number, required: true },
                        active: { type: Boolean, required: true },
                    })

                - Utilisation:
                    // Création d'une leçons:

                    model.Chapters.findOne()
                    .exec()
                    .then((doc_chapter) => {
                        model.Lessons.create({
                            title: "Introduction à Mongoose",
                            duration: 7,
                            chapter: doc_chapter._id
                        })
                    })
                    .catch((err) => console.log(err))


                    // Récupération des leçon avec le chapitre correspondent:

                    model.Lessons.find({ chapter: "62519c034d3f8b4ab0ca837a" })
                    .populate("chapter")
                    .exec()
                    .then((lessons) => console.log(lessons))
                    .catch((err) => console.log(err))
                
*/
const schema = mongoose.Schema;

const chapterSchema = schema({
    title: { type: String, required: true, index: true },
    nbOfLessons: { type: Number, required: true },
    active: { type: Boolean, required: true },
    index: Number
}, { 
    timestamps: true // Ajoute un champ "createdAt" et "updatedAt"
})

module.exports.chapterSchema = chapterSchema;