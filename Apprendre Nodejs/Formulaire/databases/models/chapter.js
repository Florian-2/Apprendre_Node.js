const mongoose = require("mongoose");
const schema = mongoose.Schema;

const chapterSchema = schema({
    title: { 
        type: String,
        required: [true, "Le titre est requis"],
        minlength: [3, "3 caractères minimum"],
        maxlength: [50, "50 caractères maximum"]
    },
    nbOfLessons: { 
        type: Number, 
        required: [true, "Le nombre de leçons est requis"],
        min: 1,
        max: 20
    },
    active: { type: Boolean, required: true },
    index: Number
}, { 
    timestamps: true
})

chapterSchema.pre('save', function(next) {
    Chapters.countDocuments()
    .exec()
    .then((numberOfDocs) => {
        this.index = numberOfDocs + 1;
        next();
    })
    .catch((err) => console.log(err))
})

const Chapters = mongoose.model("chapters", chapterSchema);

module.exports = Chapters;