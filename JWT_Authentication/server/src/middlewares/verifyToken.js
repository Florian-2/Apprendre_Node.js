import jwt from "jsonwebtoken";
import { findUserById } from "../services/user.services.js";


export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "Token non fourni" });
    }

    const token = authHeader.split(" ")[1];

    try {
        let decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

        const user = await findUserById(decodeToken.sub);

        req.user = user;
        next();
    }     
    catch (error) {
        res.clearCookie("jwt");
        res.status(403).json({ message: "Votre session a expiré, veuillez vous connecter" });
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const id = req.user._id;
        const user = await findUserById(id);

        if (!user.admin) {
            return res.sendStatus(403);
        }

        next();
    } 
    catch (error) {
        console.log(error);
    }
}