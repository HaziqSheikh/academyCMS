const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: String,
  content: String,
  for: String,
});

const Notice = new mongoose.model("Notice", noticeSchema);
module.exports = Notice;
