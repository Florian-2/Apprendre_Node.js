import { Router } from "express";

const router = Router();

router.get("/me", (req, res) => {
    res.json({ id: 1, firstname: "Florian" });
});

export default router;