import { checkSchema } from "express-validator";
import User from "../models/user.model.js";


export const userSignupSchema = checkSchema({
    email: {
        trim: true,
        toLowerCase: true,
        isEmail: {
            errorMessage: "Le format de l'adresse mail est invalide",
            bail: true
        },
        custom: {
            options: async (email) => {
                const user = await User.find({ email }).exec();

                if (user.length > 0) {
                    return Promise.reject(false);
                }
                else {
                    return Promise.resolve(true);
                }
            },
            errorMessage: "Adresse mail déjà utilisée"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Mot de passe requis",
        },
        matches: {
            options: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*+#?&])[A-Za-z\d@$!%*+#?&]{8,}$/, "g"],
            errorMessage: "Le mot de passe doit contenir au moin 8 caractère dont 1 lettre, 1 chiffre et 1 caractère spécial"
        }
    },
    name: {
        trim: true,
        isLength: {
            options: { min: 4 },
            errorMessage: "4 caractères minimums"
        }
    }
})

export const userLoginSchema = checkSchema({
    email: {
        trim: true,
        toLowerCase: true,
        isEmail: {
            errorMessage: "Le format de l'adresse mail est invalide",
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Mot de passe requis",
        }
    }
})