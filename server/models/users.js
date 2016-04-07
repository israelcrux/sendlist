/**
*
* Users model
* made by @dantaex
*
**/
var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({

  password : {type:String, select:false},

  facebook_id : {type:String, select:false, unique:true},

  email : {type: String, unique:true },

  // Meta
  first_name : {type:String, required:true},
  last_name  : String,

  created : { type:Date, default:Date.now },
  updated : { type:Date, default:Date.now }
});

UserSchema.pre('save',function(next){
  //Password hashing
  if(this.password){
    this.password = bcrypt.hashSync(this.password, 8);    
  }
  next();
});

module.exports = mongoose.model( 'User', UserSchema );