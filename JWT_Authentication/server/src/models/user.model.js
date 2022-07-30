import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { isEmail, isPassword } from "../utils/validators.js";


const userSchema = mongoose.Schema({
    name: { 
        type: String, 
        require: [true, "Nom et Prénom requis"],
        minLength: [4, "4 caractères minimum"]
    },
    email: { 
        type: String, 
        require: [true, "Adresse email requise"],
        lowercase: true,
        trim: true,
        unique: [true, "L'adresse mail est déjà utilisé"],
        validate: [isEmail, "Le format de l'adresse mail est invalide"]
    },
    password: {
        type: String,
        required: [true, "Mot de passe requis"],
        validate: [isPassword, "Le mot de passe doit contenir au moin 8 caractère dont 1 lettre, 1 chiffre et 1 caractère spécial"]
    },
    admin: {
        type: Boolean,
        require: false,
        default: false,
    },
    refreshToken: {
        type: String,
        require: false,
        default: ""
    }
}, { timestamps: true });


// Hacher le mot de passe avant d'enregistrer le document dans la DB
userSchema.pre('save', async function (next) {
    const user = this;

    try {       
        if (!user.isModified('password')) 
            return next();

        const hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;
        next();
    } 
    catch (error) {
        next(error);
    }
})

userSchema.methods.deleteProp = function(...prop) {
    const user = this.toObject();  

    for (const key in user) {
        if (prop.includes(key)) {
            delete user[key];
        }
    }
    return user;
}

const UserModel = mongoose.model("user", userSchema);

export default UserModel;