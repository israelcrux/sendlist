/**
*
* Lists model
* made by @dantaex
*
**/
var mongoose = require('mongoose');

var ListSchema = mongoose.Schema({

  user : { type:mongoose.Schema.ObjectId, ref:'User', required:true },

  title : String,

  items : {
    type : [
      {
        done : {type:Boolean, default:false},
        text : String
      }
    ],
    validate: [limit, '{PATH} exceeds the limit of 50 items']
  },

  shared : {type:Boolean, default:false},

  created : { type:Date, default:Date.now },
  updated : { type:Date, default:Date.now }
});

function limit(val) {
  return val.length <= 10;
}

module.exports = mongoose.model( 'List', ListSchema );