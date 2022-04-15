const express = require("express");
const app = express();
const path = require("path");

require("./databases/index");
const routing = require("./routes/index");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routing);

app.listen(3000);