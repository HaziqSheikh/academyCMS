const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  activeUser: { type: Boolean, default: false },
  role: String,
  number: Number,
  address: { type: String, default: "" },
  clgName: { type: String },
  cnic: { type: Number },
  course: { type: String },
  gender: { type: String, default: "" },
  guardian: { type: String },
  guardianNo: { type: Number },
  joiningDate: { type: Date ,
  default:Date.now},
  marks: { type: Number },
  yearOfGraduation: { type: Number },
  available: String,
  exp: Number,
  expField: String,
  qualifications: String,
  status: String,
  amountPaid: { type: Number, default: 0 },
  discount:Number,
  discFee:Number,
  discountA:Number,
  dob:Date,
  installments:Number,
  paymentPlan:String,
  regNo:String,
  remainingFee:Number,
  sibClgName:String,
  sibDegree:String,
  sibMarks:Number,
  sibName:String,
  sibRelation:String,
  sibYearOfGraduation:Number,
  queryId:String,
  // joiningDate:Date.now()





});

// sibClgName: "sdf";
// sibDegree: "sdf";
// sibMarks: "3468";
// sibName: "sdf";
// sibRelation: "sdf";
// sibYearOfGraduation: "56";
// yearOfGraduation: "1021";

// address: "hope16@ethereal.email";
// amountPaid: "2000";
// clgName: "gc";
// cnic: "3310241180323";
// course: "65ddcd2a52dbc8ee42017e89";
// discFee: 18000;
// discount: "10";
//////
// discountA: 2000;
// dob: "2024-03-21";
// email: "shazim31@gmail.com";
// gender: "female";
// guardian: "shabbir";
// guardianNo: "03228795467";
// installments: "2";
// marks: "45";
// name: "haseeb";
// number: "03257872963";
// paymentPlan: "installment";
// qualifications: "bscs";
// regNo: "43";
// remainingFee: 16000;
const User = new mongoose.model("User", userSchema);
module.exports = User;
