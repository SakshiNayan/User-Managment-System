const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    userName :  { type: String , required: true },
    adminFullname: String,
    email:String,
    password:String,
    usertype : String
});

const AdminModel =new mongoose.model("admin",schema);
module.exports= AdminModel;