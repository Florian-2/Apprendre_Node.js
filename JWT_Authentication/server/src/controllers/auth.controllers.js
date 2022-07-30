import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserByToken } from "../services/user.services.js";


export const handleSignup = async (req, res) => {
    try {
        let user = await createUser(req.body);

        res.send(user);
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Une erreur est survenue lors de l'inscription" });
    }
}

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await findUserByEmail(email);

        // Vérification du mot de passe
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(401).json({ message: "Adresse mail ou mot de passe incorrect" });
        }

        // Token
        const accessToken= jwt.sign({ sub: user._id.toString() }, process.env.ACCESS_TOKEN_KEY, { expiresIn: "20s" });
        const refreshToken = jwt.sign({ sub: user._id.toString() }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "7d" });

        // (Temporaire, créer un service réutilisable pour modifier un doc) Modifier la valeur de "refreshToken"
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        user = user.deleteProp("password", "refreshToken");
        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 7 * 60 * 60 * 1000 }) // 7 jours
        res.json({ user, accessToken });
    } 
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Adresse mail ou mot de passe incorrect" });
    }
}

export const handleRefreshToken = async (req, res) => {
    const token = req.cookies?.jwt;

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        jwt.verify(token, process.env.REFRESH_TOKEN_KEY);

        let user = await findUserByToken(token);

        const accessToken= jwt.sign({ sub: user._id.toString() }, process.env.ACCESS_TOKEN_KEY, { expiresIn: "20s" });

        user = user.deleteProp("password", "refreshToken");
        res.json({ user, accessToken });
    } 
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Erreur Token" });
    }
}

// export const handleLogout = async (req, res) => {
//     // On client, also delete the accessToken
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(204); //No content
//     const refreshToken = cookies.jwt;

//     // Is refreshToken in db?
//     const foundUser = await User.findOne({ refreshToken }).exec();
//     if (!foundUser) {
//         res.clearCookie('jwt', { httpOnly: true });
//         return res.sendStatus(204);
//     }

//     // Delete refreshToken in db
//     foundUser.refreshToken = '';
//     const result = await foundUser.save();
//     console.log(result);

//     res.clearCookie('jwt', { httpOnly: true });
//     res.sendStatus(204);
// } 