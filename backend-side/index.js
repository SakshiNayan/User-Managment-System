const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require('cors')
const PORT=process.env.PORT || 7000

const Admin = require('./Routes/admin');
const Employee = require('./Routes/employee');
const Task = require('./Routes/task')

//body-parser middileware
app.use(cors());
app.use(express.json({limit:"30mb",extended:true}))
app.use(urlencoded({extended: false}))

//mongoDb conection
mongoose.connect("mongodb://localhost/User-managment-system",(data)=>{
    console.log("Successfully connect to db")
},(err)=>{
    console.log(err)
});

app.get("/",function(req,res){
    res.send("User Managment System")
})

app.listen(PORT, () => {
    console.log("App is Running at 7000");
  });


app.use('/admin',Admin);
app.use('/emp',Employee);
app.use('/assign', Task)