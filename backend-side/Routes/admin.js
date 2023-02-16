const express=require("express")
const bcrypt=require("bcryptjs")
const router=express.Router()
const jwt=require("jsonwebtoken");
const bodyparser = require('body-parser')

const AdminModel = require('../Model/admin-model');
const {checkExistingUser, generatePasswordHash} = require("../middleware/auth");

router.post('/register',async(req,res)=>{
    if(await checkExistingUser(req.body.userName)) {
        res.status(400).send("User-Exist");
    } else {
        generatePasswordHash(req.body.password).then((passwordHash)=> {
            AdminModel.create({
                adminFullname: req.body.adminFullname,
                email: req.body.email,
                userName: req.body.userName,
                password: passwordHash,

            })
            .then((data)=> { 
                res.status(200).json({
                    status:`${req.body.userName} successfylly added`,
                    item: data
                }); 
            }).catch((err)=> {
                res.status(400).send(err.message)
            })

        });
    }
   
});

router.post('/login',(req,res)=>{
    AdminModel.find({userName: req.body.userName}).then((data)=>{
        if(data.length){
            bcrypt.compare(req.body.password, data[0].password).then((val)=>{
                if(val){
                    const authToken = jwt.sign(data[0].userName, process.env.SECRET_KEY);
                    res.status(200).send({"status": "successfully login", authToken, userName: data[0].userName})
                }
                else{
                    res.status(400).send("invalid password")
                }
            })
        }
        else{
            res.status(400).send("invalid user")
        }
    })
    //console.log(userData)
  
})
router.get("/userData",(req,res)=>{
    //console.log(req.body)
    try {
        console.log(req.headers.authorization)
        const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        AdminModel.find({userName : user}).then((data)=>{
          console.log(data)
          res.status(200).send({user: data});
        }).catch((err)=>{
          res.status(400).send(err);
        })
    } catch(err) {
        res.status(400).send("Unauthorize user", err)
    }  

  })

module.exports=router;