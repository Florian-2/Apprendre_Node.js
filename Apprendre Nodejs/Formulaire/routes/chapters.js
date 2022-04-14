const router = require("express").Router();
const Chapter = require("../databases/models/chapter");

const util = require("util");

router.post("/", (req, res) => {
    // { title: <string>, nbOfLessons: <number>, active: <string> }
    const body = req.body; 

    Chapter.create({
        ...body,
        active: body.active ? true : false
    })
    .then((doc) => res.json(doc))
    .catch((err) => {
        const errors = Object.keys(err.errors).map((field) => err.errors[field].message);
        console.log(errors);

        // Format l'affiche des gros objet
        // console.log(util.inspect(err, { compact: true, depth: 5, breakLength: 80, colors: true }));

        res.status(400).render("index", { errTitle: errors[0], errLessons: errors[1] });
    })
})

module.exports = router;