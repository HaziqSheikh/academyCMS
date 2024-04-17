const Notice=require("../../schemas/Notice")
const createNotice=async(req,res)=>{
    let nya=new Notice(req.body)
        let resp = await nya.save()
        if (resp) {
            let notices=await Notice.find()
            res.json({
                success:true,
                data:notices
            })
            
        }else{
            res.json({
                success:false,
                data:[]
            })
        }
}

const getNotices=async(req,res)=>{
    try {
        let founded=await Notice.find()
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
module.exports={createNotice,getNotices}