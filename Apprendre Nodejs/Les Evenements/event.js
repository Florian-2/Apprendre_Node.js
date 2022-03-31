// Module natif Node pour les évènements
const Emitter = require('events');

const emitter = new Emitter();

emitter.on("read-file", (e) => {
    console.log("Nom du fichier ouvert:", e.filename)
});

emitter.emit("read-file", { filename: __filename });


/* Fonction utiles

    - setImmediate() = Exécute la fonction (qui réagi a l'event) de manière asynchrone.
    - once() = Pour exécuter la fonction de callback attachée à un listener qu'une seule fois.
    - removeListener(eventType) = Pour supprimer le dernier listener ajouté au tableau des listeners
*/