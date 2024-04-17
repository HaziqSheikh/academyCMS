const User = require("../../schemas/User")
const jwt = require("jsonwebtoken")
const singIn = async(req, res) => {
   
    try {
        // console.log(req.body);
        let founded = await User.findOne({ $and: [{ number: req.body.number },{ email: req.body.email }] })
        // let founded= await User.findOne({email:req.body.email})
        // console.log(founded);
        if (founded == null) {
            let nya = new User(req.body)

            let resp = await nya.save()
            // console.log(resp);
            res.json({
                success: true,
                data:resp
            })

        } else {
            res.json({
                success: false
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        // console.log(req.body)
        let token;
        let Email = req.body.email
        let Password = req.body.password

        const UserMila = await User.findOne({ $and: [{ password: req.body.password }, { email: req.body.email }] })
        // user=UserMila
        // console.log(UserMila);

        if (UserMila) {
            // .....jwtoken\

            jwt.sign({ id: UserMila._id }, "thisismylovecountry", { expiresIn: "12h" }, function (err, meratoken) {
                res.json({ message: "User Found", data:UserMila, meratoken,success:true });
            });



        } else {
            res.json({ message: "User not Found",success:false });
        }
    } catch (error) {
        console.log(error);

    }
}
const session = async (req, res) => {
    // console.log(req.body);

    jwt.verify(req.body.SomeToken, "thisismylovecountry", async function (err, data) {
        // console.log(data,"data");
        if (data) {
            let user = await User.findById(data.id);
            // console.log(user);

            if (user) {
                res.json({
                    success: true,
                    user
                })
            } else {
                res.json({
                    success: false,

                })
            }

        }
    })
}
module.exports =
    { singIn, login,session }