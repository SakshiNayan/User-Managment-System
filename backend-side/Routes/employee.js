const express=require("express");
const router=express.Router();
const empModel = require('../Model/emp-model')

router.get('/empData',async(req,res)=>{
    try{
        const data=await empModel.find();
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
router.post('/addEmp',async(req,res)=>{
    console.log(req.body)
    try{
        let data=await empModel.create({

                full_name: req.body.full_name,
                emp_name : req.body.emp_name,
                emp_email : req.body.emp_email
            });
        res.status(200).json({
            message: "employee addded successfully",
            item: data,
          });
    }catch(err){
        res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
})

router.delete('/remove-emp/:_id',async(req,res)=>{
    try{
        await empModel.deleteOne({
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