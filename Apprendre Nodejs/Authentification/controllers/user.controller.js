const { createUser } = require("../queries/user.queries");

exports.formNew = (req, res) => {
    res.render("signup", { error: null });
}

exports.userCreate = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.redirect("/");
    } 
    catch (err) {
        console.log(err);
        res.render("signup", { error: err.message });
    }
}