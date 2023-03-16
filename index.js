const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const session = require("express-session")
const mongoose = require("mongoose");
app.set("view engine","ejs")
app.use("/public",express.static("public"))

//Session
app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 300000,
    }
}))

// Connect MongoDB
mongoose.connect("mongodb+srv://seita:BEP0jlP7Dvl7IXoc@cluster0.tmrbnk3.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Success")
    }).catch(() => {
        console.log("Failure")
    });

// Defining Schema and Model
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: String,
    summary: String,
    image: String,
    textBody: String,
})

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
})

const BlogModel = mongoose.model('Blog',BlogSchema)
const UserModel = mongoose.model('User',UserSchema)

//Blog function

//Create Blog
app.get("/blog/create",(req,res) => {
    if(req.session.userId){
        res.render("blogCreate");
    }else{
        res.redirect("/user/login")
    }
});

app.post("/blog/create",(req,res) => {
    console.log("reqの中身",req.body);
    BlogModel.create(req.body)
    .then(() => {
        console.log("データの書き込みが成功しました")
        res.redirect("/")
    }).catch(() => {
        console.log("データの書き込みが失敗しました")
        res.render("error",{message:"ブログ書き込みのエラー"})
    })
})

//Read All Blog
app.get("/",async(req,res) => {
    const allBlogs = await BlogModel.find()
    res.render("index",{allBlogs: allBlogs, session: req.session.userId})
})

//Read Single Blog
app.get("/blog/:id",async(req,res) => {
    const singleBlog = await BlogModel.findById(req.params.id)
    res.render("blogRead",{singleBlog: singleBlog, session: req.session.userId})
})

//Update Blog
app.get("/blog/update/:id",async(req,res) => {
    const singleBlog = await BlogModel.findById(req.params.id)
    res.render("blogUpdate",{singleBlog})
})

app.post("/blog/update/:id",(req,res) => {
    BlogModel.updateOne({_id: req.params.id},req.body)
    .then(() => {
        console.log("データの編集が成功しました")
        res.redirect("/")
    }).catch(() => {
        console.log("データの編集が失敗しました")
        res.render("error",{message: "ブログ更新エラー"})
    })
})

//Delete Blog
app.get("/blog/delete/:id",async(req,res) => {
    const singleBlog = await BlogModel.findById(req.params.id)
    res.render("blogDelete",{singleBlog})
})

app.post("/blog/delete/:id",(req,res) => {
    BlogModel.deleteOne({_id: req.params.id})
    .then(() => {
        console.log("データの削除が成功しました")
        res.redirect("/")
    }).catch(() => {
        console.log("データの削除が失敗しました")
        res.render("error",{message: "ブログ削除エラー"})
    })
})

//User function
//Create User
app.get("/user/create",(req,res) => {
    res.render("userCreate")
})

app.post("/user/create",(req,res) => {
    UserModel.create(req.body)
    .then(() => {
        console.log("ユーザーデータの書き込みが成功しました")
        res.redirect("/")
    })
    .catch(() => {
        console.log("ユーザーデータの書き込みが失敗しました")
        res.render("error",{message: "ユーザー登録エラー"})
    })
})

//User Login
app.get("/user/login",(req,res) => {
    res.render("login")
})

app.post("/user/login",(req,res) => {
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
})

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})