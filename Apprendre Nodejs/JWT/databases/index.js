const mongoose = require("mongoose");

exports.clientPromise = mongoose
.connect("mongodb://Florian:azerty@localhost:27017/dyma?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch((err) => console.log(err))