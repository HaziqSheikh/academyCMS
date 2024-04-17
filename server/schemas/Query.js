const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  name: String,
  source: String,
  number: Number,
  courseName: String,
  dealBy: String,
  date:Date,
  doneBy:String,
  dealBy:String,
  remarks:String,
  istReminderDate:Date,
  secReminderDate:Date,
  status:Boolean,
  istReminderRemarks:{type:String,default:""},
  secReminderRemarks:{type:String,default:""},
  secReminderStatus:Boolean,
  istReminderStatus:Boolean,
  finalStatus:{type:Boolean,default:false},
  acCreated:{type:Boolean,default:false},
  finalStatusRemarks:{type:String,default:""}



});


const Query = new mongoose.model("Query", querySchema);
module.exports = Query;
