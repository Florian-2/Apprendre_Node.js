const express = require("express");
const router = express.Router();

router.get("/posts", (req, res) => {
    res.json([
        { id: 1, content: "Apprendre Python...", author: "Florian" },
        { id: 2, content: "Comment fonctionne Node.js ?", author: "Marion" },
        { id: 3, content: "Apprendre Golang, bonne idée ?", author: "Lucas" },
    ])
})

module.exports = router;