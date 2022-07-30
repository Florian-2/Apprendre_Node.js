import { Router } from "express";
import { userSignupSchema, userLoginSchema } from "../schemas/user.schemas.js";
import { handleSignup, handleLogin, handleRefreshToken } from "../controllers/auth.controllers.js";
import { checkFormIsValid } from "../middlewares/verifySignup.js";


const router = Router();

router.post("/signup", [userSignupSchema, checkFormIsValid], handleSignup);
router.post("/login", [userLoginSchema, checkFormIsValid], handleLogin);
router.get("/refresh", handleRefreshToken);

export default router;