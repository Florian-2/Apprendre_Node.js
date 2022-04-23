const session = require("express-session");
const MongoStore = require("connect-mongo");
const { app } = require("../app");
const { clientPromise } = require('../databases/index');

app.use(session({
    secret: "maCléSecret", 
    resave: false, 
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 15 * 1000 // 15 jours en millisecondes
    },
    store: MongoStore.create({
        clientPromise: clientPromise.then((mongoose) => mongoose.connection.getClient()),
        ttl: 60 * 60 * 24 * 15 // 15 jours en secondes
    })
}));