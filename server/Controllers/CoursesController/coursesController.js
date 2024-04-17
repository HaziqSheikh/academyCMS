const cloudinary = require('cloudinary').v2;
const { isObjectIdOrHexString } = require('mongoose');
const Course = require("../../schemas/Course");
const {uploadToCloudinary}=require("../../upload")

const createCourse =  async(req, res) => {
 
  try {
  
    let founded = await Course.findOne({ name:req.body.name})
 
    if (founded == null) {
     
        let attachment=  await  uploadToCloudinary(req.files.attachment[0].path)
        let posterImage= await uploadToCloudinary(req.files.image[0].path)
      
        let obj={
          name:req.body.name,
          desc:req.body.desc,
          courseAmount:req.body.courseAmount,
          duration:req.body.duration,
          teacherId:req.body.teacherId,
          posterImage,
          attachment
        }
      
        let nya=new Course(obj)
        let resp = await nya.save()
        let allCourses= await Course.find()
       

        
        res.json({
            success: true,
            data:allCourses
        })

    } else {
      let allCourses= await Course.find()
        res.json({
          data:allCourses,
            success: false
        })
    }
} catch (error) {
    console.log(error);
}
  // console.log(req.body);
  // console.log(req.files);


};
const getAllCourses=async(req,res)=>{
  try {
      let founded=await Course.find()
      if (founded) {
          res.json({
              success:true,
              data:founded
          })
          
      }else{

          res.json({
              success:false,
              data:[]
          })
      }
  } catch (error) {
      
  }
}



module.exports = {
  createCourse,getAllCourses
};
