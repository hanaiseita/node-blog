//Update Blog
const BlogModel = require("../../models/blog")

module.exports = (req,res) => {
    BlogModel.updateOne({_id: req.params.id},req.body)
    .then(() => {
        console.log("データの編集が成功しました")
        res.redirect("/")
    }).catch(() => {
        console.log("データの編集が失敗しました")
        res.render("error",{message: "ブログ更新エラー"})
    })
}