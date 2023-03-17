//Delete Blog
const BlogModel = require("../../models/blog")

module.exports = (req,res) => {
    BlogModel.deleteOne({_id: req.params.id})
    .then(() => {
        console.log("データの削除が成功しました")
        res.redirect("/")
    }).catch(() => {
        console.log("データの削除が失敗しました")
        res.render("error",{message: "ブログ削除エラー"})
    })
}