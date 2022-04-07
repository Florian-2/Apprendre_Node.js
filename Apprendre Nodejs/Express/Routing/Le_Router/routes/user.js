const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "Florian" },
        { id: 2, name: "Marion" },
        { id: 3, name: "Lucas" },
    ])
})

router.get("/:id", (req, res) => {
    res.json({ id: req.params.id, name: "Florian" })
})

module.exports = router;