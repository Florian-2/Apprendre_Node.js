class MyEmitter
{
    constructor()
    {
        // Chaque clé aura comme valeur un tableau qui contient toutes les fonctions qui sont exécuter quand un évènement est emit (fnListener)
        this.events = {};
    }

    // Écouteur d'évènement
    on(eventType, fnListener) {
        this.events[eventType] = this.events[eventType] || [];
        this.events[eventType].push(fnListener);
    }
    
    // Émetteur d'évènement
    emit(eventType) {
        if (this.events[eventType]) {
            this.events[eventType].forEach((fnListener) => fnListener());
        }
    }
}

const emitter = new MyEmitter();

emitter.on("read-file", () => {
    console.log("Data du fichier...");
})

// 100 lignes de codes...

emitter.on("read-file", () => {
    console.log("Data du fichier 2...");
})

emitter.emit("read-file");