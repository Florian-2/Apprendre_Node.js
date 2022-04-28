const mongoose = require("mongoose");

mongoose.connect("mongodb://Florian:azerty@localhost:27017/dyma?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connexion établie !"))
.catch((err) => console.log(err))