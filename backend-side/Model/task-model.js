const mongoose=require("mongoose");

const Taskschema=new mongoose.Schema({
    title:  { type: String },
    description:  { type: String },
    Name :  { type: String },
    status :  { type: String },
    startTime: String,
    endTime: { type: String},
});

const taskModel=new mongoose.model("assign-task",Taskschema);
module.exports= taskModel;