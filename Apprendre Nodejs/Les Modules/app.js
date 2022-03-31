// Module natif
const util = require("util");
console.log(util.types.isDate(new Date())); // true
console.log(util.types.isDate(21)); // false


// Module perso
const myModule = require("./myModule1");
const getName2 = require("./myModule1").name2; // Florian

console.log(myModule);
/*
{
    name2: 'Florian',
    sayHello: [Function: sayHello],
    squareOfFive: 25,
    calc: [Function (anonymous)]
}
*/

console.log(myModule.name); // undefined
console.log(myModule.name2); // Florian
console.log(myModule.squareOfFive); // 25