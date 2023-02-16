const express=require("express");
const router=express.Router();
const taskModel = require('../Model/task-model')

router.get('/task-data',async(req,res)=>{
    try{
        const data=await taskModel.find();
        res.status(200).json({
          data:data
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
})
router.post('/addTask',async(req,res)=>{
    
    // const today = new Date()
    // const option  = {
    //     day: "numeric",
    //     month: "long",
    //     year: "numeric"
    // }
    // const option1 = {
    //     hour: "numeric",
    //     minute: "numeric",
    //     hour12: false
    // }
    // const day = today.toLocaleDateString("en-Us", option);
    // const time = today.toLocaleTimeString("en-Us", option1);
    // const date = day + " " + time;   
    try{
        let data=await taskModel.create({

                title: req.body.title,
                description: req.body.description,
                Name : req.body.Name,
                startTime :req.body.startTime,
                status : req.body.status,
                endTime : req.body.endTime,
            });
            res.status(200).json({
                message: "task addded successfully",
                item: data,
              });
        }catch(err){
            res.status(400).json({
                status:"failed",
                message:err.message
            })
        }
})

router.delete('/removeTask/:_id',async(req,res)=>{
    console.log(req.body)
    try{
        await taskModel.deleteOne({
          $and: [
                        { _id: { $eq: req.params._id } }
                      ]
        });
        res.status(200).json({
          status:"success",
          message:"deleted successfully"
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
})

module.exports=router