const mongoose = require("mongoose");


let connection=()=>{
    mongoose
  .connect("mongodb://127.0.0.1:27017/LMS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("im mongo");
  })
  .catch((e) => {
    e
  });
}

module.exports =connection