const express = require("express");
const path = require("path");

require("./databases/index");
const routing = require("./routes/index");
const app = express();
exports.app = app;

require("./config/session.config");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(routing);

app.listen(3000);