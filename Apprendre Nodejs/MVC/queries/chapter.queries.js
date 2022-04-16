/*
    Les fichiers queries (requête) sont là pour communiquer avec base de donnée.
*/
const Chapter = require("../databases/models/chapter");


exports.getChapters = () => Chapter.find().exec();

exports.getChapterById = (id) => Chapter.findById(id).exec();

exports.deleteChapterById = (id) => Chapter.findByIdAndDelete(id).exec();

// data: { title: <string>, nbOfLessons: <number>, active: <string> }
exports.createChapter = (data) => Chapter.create({ ...data, active: body.active ? true : false });