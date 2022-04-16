/*
    Les fichiers queries (requête) sont là pour communiquer avec base de donnée.
*/
const Chapter = require("../databases/models/chapter");


exports.getChapters = () => Chapter.find().exec();

exports.getChapterById = (id) => Chapter.findById(id).exec();

exports.deleteChapterById = (id) => Chapter.findByIdAndDelete(id).exec();

// data: { title: <string>, nbOfLessons: <number>, active: <string> }
exports.createChapter = (chapter) => {
    console.log(chapter);
    const newChapter = new Chapter({
      ...chapter,
      active: chapter.active ? true : false
    });
    return newChapter.save()
};