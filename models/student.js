const mongoose= require('mongoose');


const studentSchema = new  mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    college:{
        type:String,
        required:true,
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
    }
},{
    timestamps:true
});

const Student=mongoose.model('Student',studentSchema);

module.exports=Student;