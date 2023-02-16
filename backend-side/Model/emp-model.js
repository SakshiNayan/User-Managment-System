const mongoose=require("mongoose");
const Empschema=new mongoose.Schema({
    full_name:String,
    emp_name:String,
    emp_email: String
});

const empModel=new mongoose.model("employee",Empschema);
module.exports= empModel;