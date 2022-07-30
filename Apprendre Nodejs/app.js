const express = require("express");
const path = require("path");
const app = express();

const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
        destination (req, file, cb) {
            // n'oublie pas de crée le dossier "public"
            cb(null, path.join(__dirname, "public"));
        },
        filename (req, file, cb) {
            const cleanFileName = file.originalname.replaceAll(" ", "-");
            cb(null, `${Date.now()}-${cleanFileName}`);
        }
    })
})

app.post("/file", upload.single("avatar"), (req, res) => {
    console.log(req.file);
    res.send(req.file);
})

app.get("/get-file/:file", (req, res) => {
    console.log(req.params.file);

    res.sendFile(path.join(__dirname, "public", req.params.file + ".png"), (err) => {
        if (err) 
            res.sendStatus(500);
    });
})

app.listen(3000);