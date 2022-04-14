const schema = mongoose.Schema;

const chapterSchema = schema({
    title: { type: String, required: true, index: true },
    nbOfLessons: { type: Number, required: true },
    active: { type: Boolean, required: true },
    index: Number
}, { 
    timestamps: true
})

const Chapters = mongoose.model("chapters", chapterSchema);

module.exports = Chapters;