//Create User
const UserModel = require("../../models/user")

module.exports = (req,res) => {
    UserModel.create(req.body)
    .then(() => {
        console.log("ユーザーデータの書き込みが成功しました")
        res.redirect("/")
    })
    .catch(() => {
        console.log("ユーザーデータの書き込みが失敗しました")
        res.render("error",{message: "ユーザー登録エラー"})
    })
}