const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const chapterSchema = mongoose.Schema({
    qcms: { type: Array },
    title: { type: String }
})

const model = mongoose.model("test1", chapterSchema);

mongoose.connect("mongodb://Florian:azerty@localhost:27017/Exercice?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("ok"))
.catch((err) => console.log(err))


app.get("/example", async (req, res) => {
    res.send(await model.findOne({ "qcms.id": req.body.id }));
})

app.get("/ip", (req, res) => {
    res.send(req.ip);
})

app.listen(3000);