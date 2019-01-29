const mongoose = require("mongoose");
const schema = mongoose.Schema;
const RegSchema = new schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  confirmpassword: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now,
    once: true
  },
  updated: {
    type: Date,
    default: Date.now,

  }


})
const userModel = mongoose.model('register', RegSchema);
module.exports = userModel;