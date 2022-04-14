/*
    C'est quoi un module ?
        Une module est un fichier.

        Les module nous permet de s'épparer notre code en plusieurs morceaux, ont choisi ce qu'on export et dans les autre module on récupère ce qu'on souhaite utiliser via la fonction "require(<chemin_relatif>)".


    D'ou viennent "module", "export", "require", "__dirname" etc... ?

        Avant que le code d'un module ne soit exécuté, Node.js, va ajouter une fonction appelée "wrapper", et cette fonction va englober tout le contenu de notre module et cette fonction à comme paramètre toute ces variable/fonction.

        (function(exports, require, module, __filename, __dirname) {
            // Le code du module.
        });


    A savoir !
        Par défaut un module export un objet vide.
        Une fois qu'un module à été exporté il est mit en cache par Node.


*/
// const name = "Lucas";
// const name2 = "Florian";

function sayHello(name) {
    console.log(`Salut ${name} !`);
}

// const test = { firstname: "Florian" };

// module.exports = test;
// module.exports.name2 = name2;

// // Syntaxe 1
module.exports.sayHello = sayHello;

// // Syntaxe 2 (il ajoutera le "module." lui même)
exports.squareOfFive = 25;
exports.calc = (num1, num2) => num1 + num2;