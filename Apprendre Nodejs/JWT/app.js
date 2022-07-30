const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

require("./databases/index");
const routing = require("./routes/index");
const app = express();
exports.app = app;

app.use(cookieParser());
require("./config/jwt.config");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routing);

app.listen(3000);