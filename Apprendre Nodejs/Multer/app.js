const express = require("express");
const app = express();
const path = require("path");
// const fileType = require('file-type');
// import { fileTypeFromBuffer } from "file-type";

require("./database/index");



/* Multer 

    En faisant un "require('multer')" on récupère une fonction qui elle retourne une sorte d'instance nommé "Multer" surla quel il existe quelques méthodes et propriétés.

    Les options:
        - dest = Prend le chemin vers le quel il doit stocker les fichiers.

        - limits = Indique des limite qui servent notament au niveau de la sécuriter.
            Les options: 
                - fileSize = La taille maximale autorisé pour chaque fichier.
                - files = Indique le nombre de champ HTML de type "file" que le serveur peut traiter
                - fields = Indique combien d'autre champ le serveur peut traiter en dehors des champ de type "file"
                - fieldNameSize = Limite de la taille du nom du fichier, par défaut c'est 100 octets par nom de fichier.
                - fieldSize = Limite de la taille de la valeur d'un champ de type texte.

         

    Les Méthodes dispo:
        Ces méthode là sont des middleware qui après avoir fais le travaille appel la fonction "next()", et ces méthode là ajoute une clé nommé "file" ou "files" sur l'objet "req" et cette clé on a accès à des propriété comme size / filename / mimetype etc...

        - .single(<fieldNameHTML>) = Cette méthode peut récupérer une seul fichier et elle prend le nom du champ HTML, elle va créer une clé nommé "req.file" sur la quel il existe des propriété comme "size", "filename" etc...

        - .array(<fieldNameHTML>, <maxFile>) = Cette méthode peut récupérer plusieurs fichiers depuis un champ en particulier et elle prend le nom du champ HTML et le nombre de fichier max que le serveur peut traiter pour ce champ

        - .fields(<array>) = Cette méthode prend un tableau avec des objet qui peuvent avoir une clé "name" qui fait référence au nom du champs HTML et une clé "maxCount" qui dit combien de fichier max le serveur peut traiter pour ce champ là.
      
*/
const multer = require("multer");

const MIME = ["image/jpeg", "image/png", "text/plain"];

const upload = multer({
    dest: path.join(__dirname, "upload"),
    limits: { 
        fileSize: 3_145_728, // 3 Mo (1Mo = 1 048 576),
        // fieldNameSize: 100
        // files: 2,
        // fields: 1,
    }, 
    fileFilter (req, file, cb) {
        if (!MIME.includes(file.mimetype)) {
            return cb(new Error('Seuls les PDF sont autorisés'));
        } 
        else {
            cb(null, true);
        }
    }
})
// console.log(upload);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
})

// Upload 1 seul ficher
app.post("/file", upload.single("avatar"), (req, res) => {
    console.log(req.body); // Contient les champs de texte, s'il y en a. 
    console.log(req.file); // Contient le fichier qu'on à déposé dans le champ HTML "avatar".
    res.end();
})


// (array) Upload plusieurs fichers
app.post("/files-array", upload.array("avatar", 2), (req, res) => {
    res.send(req.files);// Contient un tableau avec un objet pour chaque fichier
})
// (array) Plusieur fichier depuis un seul input
app.post("/input-files-multiple", upload.array("id"), (req, res) => {
    res.send(req.files); // Contient un tableau avec un objet pour chaque fichier
})


// (fields) Upload plusieurs fichers
const fields = [
    { name: "avatar" },
    { name: "idCard", maxCount: 2 } // 2 fichier max pour ce champ
]

app.post("/files-fields", upload.fields(fields), (req, res) => {
    // Contient un tableau avec une clé qui pour le nom qu'on passe à "name" et comme valeur de cette clé on à un tableau qui contient un objet pour chaque fichier
    res.send(req.files);
})



app.listen(3000);