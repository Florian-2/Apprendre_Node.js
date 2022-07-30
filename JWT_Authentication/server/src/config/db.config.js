import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})
.then(() => console.log("connection to the database established"))
.catch((err) => console.log(err))