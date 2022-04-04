const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { 
        name: "Florian", 
        tag: "<span>Escape</span>",
        isAuthenticated: true, 
        products: [
            { name: "Iphone 12", price: 950 }, 
            { name: "Xiaomi MI 9", price: 450 }, 
            { name: "Honor magicbook pro", price: 829.90 }
        ]
    })
})

app.listen(3000);