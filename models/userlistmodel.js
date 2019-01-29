 
const mongoose = require('mongoose');
const schema  = mongoose.Schema;
const  Userschema = new schema({
    event_name:{type:String, required:true},
    event_description:{type:String, required : true},
    created_date:{type:Date, default:Date.now}
});
const usermodel = mongoose.model('Users', Userschema);
module.exports=usermodel;