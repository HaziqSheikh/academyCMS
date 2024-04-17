const Query = require("../../schemas/Query");
const createQuery = async (req, res) => {
  console.log(req.body.secReminderDate);
  try {
    let founded = await Query.findOne({ number: req.body.number });
    // console.log(founded);
    if (founded == null) {
      let nya = new Query(req.body);
      let resp = await nya.save();
      // console.log(resp);
      let qureis = await Query.find();
      res.json({
        success: true,
        data: qureis,
      });
    } else {
      let qureis = await Query.find();
      res.json({
        success: false,
        data: qureis,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getQuries = async (req, res) => {
  try {
    let qureis = await Query.find();
    if (qureis) {
      res.json({
        success: true,
        data: qureis,
      });
    } else {
      res.json({
        success: false,
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const updateIstRemarks = async (req, res) => {
  // console.log(req.body);
  let entity = req.body.route;
  try {
    if (entity == "istReminderRemarks") {
      let founded = await Query.findByIdAndUpdate(
        req.body.query._id,
        {
          $set: {
            istReminderRemarks: req.body.remarks,
          },
        },
        { new: true }
      );

      if (founded) {
        let qureis = await Query.find();

        res.json({
          success: true,
          data: qureis,
        });
      } else {
        let qureis = await Query.find();

        res.json({
          success: false,
          data: qureis,
        });
      }
    } else {
      let founded = await Query.findByIdAndUpdate(
        req.body.query._id,
        { $set: { secReminderRemarks: req.body.remarks, finalStatus: true } },
        { new: true }
      );
      if (founded) {
        let qureis = await Query.find();

        res.json({
          success: true,
          data: qureis,
        });
      } else {
        let qureis = await Query.find();

        res.json({
          success: false,
          data: qureis,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const searchQueryByName = async (req, res) => {
  // console.log(req.body);
  let founded = await Query.find({ name: req.body.data });
  console.log(founded);
  if (founded.length != 0) {
    res.json({
      success: true,
      data: founded,
    });
  } else {
    res.json({
      success: false,
      data: [],
    });
  }
};
const searchQueryByDate = async (req, res) => {
  // console.log(req.body);
  const fromDate = new Date(req.body.fromDate + "T23:59:59Z");
  fromDate.setUTCHours(0, 0, 0, 0);
  const toDate = new Date(req.body.toDate + "T23:59:59Z");
  fromDate.setUTCHours(0, 0, 0, 0);
  // console.log(fromDate,":from date")
  // console.log(toDate,":to date");
  // let founded= await Query.find({ $and: [{ date: req.body.fromDate },{ date: req.body.toDate }] })
  // let founded= await Query.find({date:req.body.fromDate})
  let founded = await Query.find({
    date: {
      $gte: fromDate,
      $lte: toDate,
    },
  });
  // let founded= await Query.find()
  // console.log(founded);
  if (founded.length != 0) {
    res.json({
      success: true,
      data: founded,
    });
  } else {
    res.json({
      success: false,
      data: [],
    });
  }
};
const updateFinalStatus=async(req,res)=>{
    console.log(req.body);
    try {
     
        let founded = await Query.findByIdAndUpdate(
          req.body.query._id,
          {
            $set: {
              finalStatusRemarks: req.body.status.finalStatus,
            },
          },
          { new: true }
        );
  
        if (founded) {
          let qureis = await Query.find();
  
          res.json({
            success: true,
            data: qureis,
          });
        } else {
          let qureis = await Query.find();
  
          res.json({
            success: false,
            data: qureis,
          });
        }
     
    } catch (error) {
      console.log(error);
    }

}
module.exports = {
  createQuery,
  getQuries,
  updateIstRemarks,
  searchQueryByName,
  searchQueryByDate,
  updateFinalStatus
};
