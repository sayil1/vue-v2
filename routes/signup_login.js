const express = require("express");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const session = require("express-session");
const User = require("../models/registrationModel");
const router = express.Router();

router.get("/register", (req, res) => {
  res.send("registration works");
  console.log("working");
});


router.post("/reg", (req, res) => {
  let errors = [];
  console.log("working")
  if (req.body.password != req.body.confirmpassword) {
    errors.push({
      test: "passwords do not match"
    });
  }

  if (req.body.password.length < 4) {
    errors.push({
      test: "password too short"
    });
  }
  if (errors.length > 0) {
    res.send(errors);
    console.log(errors)
  } else {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        res.status(500).send("an account already exist with this email address");
        console.log("this account exists")
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw error;
            else {
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.status(200).send("suceesfully registered");
                  console.log("success")
                })
                .catch(err => {
                  console.log(err);
                });
              console.log(newUser);
            }
          });
        });
      }
    });
  }
});

router.get("/allusers", (req, res) => {
  User.find((err, result) => {
    if (err) {
      reject({
        error: "not found"
      })
    } else {
      res.send(result)
    }
  }).sort({
    created_date: 'desc'
  })
})

router.post("/login", async(req, res, next) => {

 await User.findOne({
      email: req.body.email

    }) 
    .then(user => {
      console.log(user)
      if (user==null) {
        res.status(500).send("auth failed.. wrong user");
        console.log("not seen")
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) throw error;
          if (isMatch) {
            res.status(200).send("ok");
            console.log("successful")
          } else {
            res.send("this is failing");
            console.log("failed")
          }
        });
      }
      console.log(req.body.password);
      console.log(req.body.email);

    });

});

module.exports = router;