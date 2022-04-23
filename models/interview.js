const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const IMAGE_PATH = path.join('/uploads/job/company');

// Creating interview schema
const interviewSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    discription:{
        type:String
    },

    //include the array od ids of all the students who applied for the job itself
    students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
},{
    timestamps:true
});




    const Interview = mongoose.model('Interview',interviewSchema);
    module.exports = Interview;