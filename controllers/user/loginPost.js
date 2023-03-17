
const UserModel = require("../../models/user")

module.exports = (req,res) => {
    UserModel.findOne({email: req.body.email})
    .then((result) => {
        if(req.body.password === result.password){
            req.session.userId = result._id
            res.redirect("/")
        }else{
            res.render("error",{message: "パスワードが間違っています"})
        }
    }).catch(() => {
        res.render("error",{message: "存在しないユーザーです"})
    })
}