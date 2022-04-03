/*  Module Path 

    - .basame(<path>) = Permet de retourner la dernière portion d'un path.
    - .dirname(<path>): string = Récupère le chemin du dossier.
    - .extname(<path>): string = Récupère l'extension du fichier.
    - .isAbsolute(<path>): boolean = Savoir si c'est un chemin absolut ou relatif.
    - .join(<...path>): string = Permet de fusionner des chemin (prend un nombre infini de paramètres).
*/
const path = require("path");


const folder = path.dirname("./Les Fichier/Path/app.js");
console.log(folder); // ./Les Fichier/Path
console.log(path.basename(folder)); // Path


const extensionFile = path.extname("./Les Fichier/Path/app.js");
console.log(extensionFile); // .js


path.isAbsolute("./Les Fichier/Path/app.js"); // false
path.isAbsolute("/Les Fichier/Path/app.js"); // true


const completePath = path.join(__dirname, "app.js");
console.log(completePath); // C:\Users\Florian\Documents\Tuto_Dev\JavaScript\Node\Apprendre Nodejs\Les_Fichiers\Path\app.js


path.parse('/home/user/dir/file.txt');
/*
{ 
    root: '/',
    dir: '/home/user/dir',
    base: 'file.txt',
    ext: '.txt',
    name: 'file' 
}
*/