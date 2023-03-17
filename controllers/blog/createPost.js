//Create Blog
const BlogModel = require("../../models/blog")

module.exports = (req,res) => {
    console.log("reqの中身",req.body);
    BlogModel.create(req.body)
    .then(() => {
        console.log("データの書き込みが成功しました")
        res.redirect("/")
    }).catch(() => {
        console.log("データの書き込みが失敗しました")
        res.render("error",{message:"ブログ書き込みのエラー"})
    })
}