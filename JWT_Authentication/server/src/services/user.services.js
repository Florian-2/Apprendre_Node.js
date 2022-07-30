import User from "../models/user.model.js";

export const createUser = async (body) => {
    try {
        const { name, email, password } = body;
        let user = await User.create({ name, email, password });
        user = user.deleteProp("password", "__v");

        return user;
    }
    catch (error) {
        throw error;
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email }).select("-refreshToken -__v").exec();

        if (!user) {
            throw new Error("Utilisateur introuvable");
        }

        return user;
    }
    catch (error) {
        throw error;
    }
}

export const findUserById = async (id) => {
    try {
        const user = await User.findById(id).select("-password -refreshToken -__v").exec();

        if (!user) {
            throw new Error("Utilisateur introuvable");
        }

        return user;
    }
    catch (error) {
        throw error;
    }
}

export const findUserByToken = async (refreshToken) => {
    try {
        const user = await User.findOne({ "refreshToken": refreshToken }).select("-password -refreshToken -__v").exec();

        if (!user) {
            throw new Error("Utilisateur introuvable");
        }

        return user;
    }
    catch (error) {
        throw error;
    }
}

// export const updateUserById = async (id) => {
//     const user = await User.findByIdAndUpdate(id, {  });
// }