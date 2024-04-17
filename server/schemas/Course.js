const mongoose=require("mongoose")

const courseSchema = new mongoose.Schema({

    attachment:String,
    desc:String,
    courseAmount: Number,
    duration:Number,
   
    
    posterImage:{type:String, default:""},
    name:{type:String},
    teacherId:{type:String},
    
    
  });
 




  
 
 
 
 



 
  
 
  
 
 
  

  const Course = new mongoose.model("Course", courseSchema);
  module.exports=Course