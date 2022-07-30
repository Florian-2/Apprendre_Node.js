import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";


const router = Router();

router.get("/me", verifyToken, (req, res) => res.send(req.user));

export default router;