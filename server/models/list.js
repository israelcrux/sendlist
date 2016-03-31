/**
*
* Lists model
*
**/
var mongoose = require('mongoose');

var ListSchema = mongoose.Schema({

  // user : { type:mongoose.Schema.ObjectId, ref: 'User' },

  title : String,

  items : [
    {
      done : {type:Boolean, default:false},
      text : String
    }
  ],

  created : { type:Date, default:Date.now },
  updated : { type:Date, default:Date.now }
});

module.exports = mongoose.model( 'List', ListSchema );