

var http = require('http');
var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.listallusers = function (req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.send(err);
            res.header("Access-Control-Allow-Headers");
            res.header("Access-Control-Allow-Origin" , "*");
        res.json(user);
       
    });
};

exports.createuser = function (req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err){
            res.send(err);}
        res.json(user);
    });
};