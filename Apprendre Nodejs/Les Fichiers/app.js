/* fs (file system)

    fs: https://nodejs.org/dist/latest-v16.x/docs/api/fs.html
    fs flag: https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#file-system-flags

    Le "fd" c'est quoi ?
        C'est simplement un identifiant permettant de suivre les fichier traité par le module "fs", d'ailleur la fonction "fs.close()" supprime/libère l'identifiant une fois qu'on en a plus besoin.

    Les principaux flags: 

        - "a" pour appending, c'est-à-dire que le fichier est créé si il n'existe pas.
        - "a+" pour appending et "+" pour lecteur
        - "r" (flag par défaut) ouverture du fichier pour lecture. Une exception est soulevée si le fichier n'existe pas.
        - "r+" ouverture du fichier pour lecture et écriture. Une exception est soulevée si le fichier n'existe pas. 
        - "w" ouverture du fichier pour écriture. Le fichier est créé si il n'existe pas ou tronqué si il existe.
        - "w+" ouverture du fichier pour écriture et lecture. Le fichier est créé si il n'existe pas ou tronqué si il existe. 

*/
const fs = require("fs");


/* ------------------------ Ouvrir et Fermer un fichier / Explication async-libuv-v8 etc... ------------------------

    Tout ce qui demande beaucoup de ressource est pris en charge par libuv ou l'os pour éviter de bloquer l'event loop, ici toute les fonctions du module "fs" viennent de libuv et sont donc exécuté sur l'un des 4 threads de la "thread pool", une fois terminer la fonction de callback passé à "open()" est exécuter par le V8.

    Résultat:
        1
        2
        3 (fd)

console.log(1);

fs.open("./docs.txt", "a", (err, fd) => {
    if (err) throw err;
    console.log(fd); // 3
    fs.close(fd, (errClose) => errClose && console.log(errClose));
})

console.log(2);
*/





/* ------------------------ Lire un fichier ------------------------ 

    Si le fichier n'existe pas il lèvera cette erreur: "no such file or directory, open '<path>'".
    Cette fonction est l'équivalent du flag "r".


fs.readFile("./docs.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data); // (Sans l'option "utf-8") <Buffer 43 6f 6e 74 65 6e 75 20 64 75 20 66 69 63 68 69 65 72 2e 2e 2e>
    console.log(data.toString()); // (Sans l'option "utf-8") Contenu du fichier...
    console.log(data); // (Avec l'option "utf-8") Contenu du fichier...
});
*/





/* ------------------------ (appendFile) Ecrire dans un fichier ------------------------ 

    Si le fichier n'existe pas il va le créer.
    Cette fonction est l'équivalent du flag "a+", elle ajoute donc des donnée à la fin du fichier sans écraser le reste.


const HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Node.js</title>
</head>
<body>
    <p>fs.appendFile()</p>
</body>
</html>`

fs.appendFile("./index.html", HTML, (err) => {
    if (err) throw err;
    console.log("Les données on bien été ajouté a la fin du fichier !");
});
*/




/* ------------------------ (writeFile) Ecrire dans un fichier ------------------------ 

    Si le fichier n'existe pas il va le créer.


fs.writeFile("./docs.txt", "Ceci remplacera le contenu du fichier", (err) => {
    if (err) throw err;
    console.log("Ecriture terminé !");

    fs.readFile("./docs.txt", "utf-8", (err, data) => {
        if (err) throw err;
        console.log(`Content File: ${data}`); // Content File: Ceci remplacera le contenu du fichier
    })
})
*/




/* ------------------------ Supprimer un fichier ------------------------ 

    Si le fichier n'existe pas on aura une erreur: "no such file or directory, unlink: <path>"


fs.unlink('./docs.txt', (err) => {
    if (err) throw err;
    console.log('Le fichier a été supprimé.');
});
*/




/* ------------------------ Créer un dossier ------------------------ 

    Si le dossier parent n'existe pas ET qu'on souhaite créer des sous dossier à l'intérieur de celui-ci il faut ajouter l'option: { recursive: true } sinon on aura une erreur comme quoi le dossier parent n'existe pas.


// Créer un dossier
fs.mkdir("./MonDossier", (err) => {
    if (err) throw err;
    console.log("Dossier créer !");
})

// Créer des sous dossier
fs.mkdir("./MonDossier/dossier1", { recursive: true }, (err) => {
    if (err) throw err;
    console.log("Sous dossier créer !");

    fs.appendFile("./MonDossier/dossier1/main.py", "counter: int = 0", (err) => {
        if (err) throw err;
        console.log("Fichier créer !");
    })
})
*/




/* ------------------------ Supprimer un dossier ------------------------ 

    Si le dossier n'existe pas on aura une erreur: "no such file or directory, rmdir: <path>"


fs.rmdir("./MonDossier/dossier2", (err) => {
    if(err) throw err;
    console.log('Dossier supprimé !');
})
*/





/* ------------------------ Lire un dossier ------------------------ */

fs.readdir("./MonDossier", (err, files) => {
    if (err) throw err;
    console.log(files); // [ 'dossier1', 'test.txt', 'test2.txt' ]

    // Boucle sur chaque éléments contenu dans le dossier et nous indique la taille et la nature de l'élément
    for (const fileOrDir of files) {
        const stats = fs.statSync(`./monDossier/${fileOrDir}`);
        console.log({
            size: stats.size,
            type: stats.isFile() ? "Fichier" : "Dossier"
        });
    }
})