const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    local: {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    username: { type: String }
}, { 
    timestamps: true 
})

// Méthode utilisable sur les models
userSchema.statics.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        return bcrypt.hash(password, salt);
    } catch(e) {
        throw e
    }
}

// Méthode utilisable sur les documents
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.local.password);
}

const Users = mongoose.model("users", userSchema);

module.exports = Users;