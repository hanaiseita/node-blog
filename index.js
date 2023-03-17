const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const session = require("express-session")
const routers = require("./routes")
const mongoose = require("mongoose")
app.set("view engine","ejs")
app.use("/public",express.static("public"))
const port = process.env.PORT || 5050

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

//Router
app.use(routers)

//Page Notfound
app.get("*",(req,res) => {
    res.render("error",{message: "page not found"})
})

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})