const mongoose= require('mongoose');
const Interview= require('../models/interview')

const studentSchema = new  mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    college:{
        type:String,
        required:true,
    },
    batch:{
        type:String
    },
    placement_status:{
        type:String,
    },
    dsa_score:{
        type:Number,
    },
    webd_score:{
        type:Number
    },
    react_score:{
        type:Number
    },
    company:[{
        type:mongoose.Types.ObjectId,
        ref:'Interview'

    }]
},{
    timestamps:true
});

const Student=mongoose.model('Student',studentSchema);

module.exports=Student;