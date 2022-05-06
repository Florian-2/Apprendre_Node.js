const mongoose = require("mongoose");

const userShema = mongoose.Schema({
    avatarURL: { type: String }
})

const Users = mongoose.model("users", userShema);

module.exports = Users;