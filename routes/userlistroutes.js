// module.exports = function (app) {
//     var UserList = require('../controller/userlistcontroller');

//     app.route('/users')
//         .get(UserList.listallusers)
//         .post(UserList.createuser);

//     // app.route("/users:userid")
//     // .get(UserList.readauser);
// };

const express = require("express");
const router = require("express").Router();
const usermodel = require("../models/userlistmodel");
// const eventsModel = require("../models/eventsModel");

router.get("/user", (req, res) => {
    console.log("Get working!")
    usermodel.find((err, data) => {
        if (err) return res.send(err);
        res.send(data);
    });
});

// router.post("/user", (req, res) => {
//     console.log("posting works");
//     const new_user = new usermodel({
//         event_name: req.body.event_name,
//         event_description: req.body.event_description
//     });
//     // console.log(new_user)

//     new_user.save(function (err, data) {
//         console.log(data);
//         if (err) {
//             res.send(err + "error occered poooo");
//         } else {
//             res.send("Data Saved!");
//         }
//     });
// });
module.exports = router;

// router.get("/welcome/:name/: nickname", (req, res) => {
//     console.log(req.params);
//     res.send("Welcome to Projaro " + req.params.name + ".Your Nick Name is " + req.params.nickname);
// })