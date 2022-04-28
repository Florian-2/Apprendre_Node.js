const mongoose = require("mongoose");

const fileShema = mongoose.Schema({
    fileURL: {
        type: String
    }
})

const Files = mongoose.model("files", fileShema);

module.exports = Files;