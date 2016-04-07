/**
*
* API Keys model
* made by @dantaex
*
**/

var mongoose = require('mongoose'),
    randomstring = require('randomstring'),
    findOrCreate = require('mongoose-findorcreate');

var KeySchema = mongoose.Schema({

  user : { 
    type:mongoose.Schema.ObjectId, 
    ref:'User', 
    required:true, 
    unique:true 
  },

  key : { type:String },//self-generated

  created : { type:Date, default:Date.now, expires: 2592000  },// 1 Month
  updated : { type:Date, default:Date.now }
});

KeySchema.pre('save',function(next){
  //Key generation
  this.key = randomstring.generate(51);
  next();
});

KeySchema.plugin(findOrCreate);

module.exports = mongoose.model( 'Key', KeySchema );