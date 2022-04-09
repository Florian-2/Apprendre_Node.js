const mongoose = require("mongoose");
const chapterSchema = require("./schema");

/* Les models */
const collectionChapter = mongoose.model("chapters", chapterSchema);

module.exports = collectionChapter;