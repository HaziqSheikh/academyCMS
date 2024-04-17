const User = require("../../schemas/User");
const Query = require("../../schemas/Query");
const nodemailer = require("nodemailer");

const initializeSalesData = require("../../SalesCalculate");

const getAllUsers = async (req, res) => {
  try {
    let founded = await User.find();
    if (founded) {
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
  } catch (error) {}
};

const updateUser = async (req, res) => {
  console.log(!req.body.activeUser);
  // console.log(req.body.activeUser,"org");

  let founded = await User.findByIdAndUpdate(
    req.body._id,
    { $set: { activeUser: !req.body.activeUser } },
    { new: true }
  );
  if (founded) {
    let updated = await User.find();
    res.json({
      success: true,
      data: updated,
    });
  } else {
    res.json({
      success: false,
    });
  }
};
const createStudent = async (req, res) => {
  // console.log(req.body);
  const password = genPassword(req.body.name);
  let resp = await sendEmail(req.body.email, password);

  let user = {
    ...req.body,
    password,
    date: new Date(Date.now()).toLocaleDateString(),
  };

  if (user.role == "student") {
    initializeSalesData(user.amountPaid)
      .then(async() => {
        // console.log("Initialization complete.");
        let qFounded = await Query.findByIdAndUpdate(
          req.body.queryId,
          { $set: { acCreated: true } },
          { new: true }
        );
        if (qFounded) {
          let nya = new User(user);
    
          let founded = await nya.save();
          if (founded) {
            let users = await User.find();
            res.json({
              success: true,
              data: users,
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error occurred during initialization:", error);
        res.json({
          success:false,
          users:[]
        })
      });
   
  
  } else if (user.role == "teacher") {
    let nya = new User(user);
    let founded = await nya.save();
    if (founded) {
      let users = await User.find();
      res.json({
        success: true,
        data: users,
      });
    }
  }

  // console.log(founded);
  // console.log("Generated Password:", password);
};

function genPassword(name) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  // Add the name to the password
  password += name;

  // Add "@" after the name
  password += "@";

  // Add 4 random numbers
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}
////send mail
async function sendEmail(toEmail, password) {
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail", // You can use other email services too
    auth: {
      user: "haseebshabbir31@gmail.com", // Your Gmail email address
      pass: "zqrq uujd iyaj tlyp", // Your Gmail password or app-specific password
    },
  });

  // Setup email data
  let mailOptions = {
    from: '"HR" <haseebshabbir31@gmail.com>',
    to: toEmail, // Receiver's email address
    subject: "Your New Password", // Subject line
    text: `Your new password is: ${password}`, // Plain text body
    // html: '<p>Your new password is: <b>' + password + '</b></p>' // HTML body (if needed)
  };

  // Send email
  let info = await transporter.sendMail(mailOptions, function (error, infor) {
    // return info
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log(infor.response, "<=resp");
      return true;
    }
  });
}

module.exports = { getAllUsers, updateUser, createStudent };
