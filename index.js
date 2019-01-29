const express = require("express");
const bodyPaser = require("body-parser");
const mongoose = require("mongoose");
const cloud = require("./routes/cloudinary");

const UserRouter = require("./routes/signup_login");
const eventsRouter = require("./routes/eventsRoutes");
const cors = require('cors');
mongoose.connect("mongodb://localhost:27017/fase");

const app = express();
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({
    extended: true
}));
app.use(cors());
app.use("/users", UserRouter)
app.use("/events", eventsRouter);
app.use("/cloud", cloud)
app.get("/", (req, res) => {
    res.send("working");
});

app.listen(2020, console.log("its on 2020"));