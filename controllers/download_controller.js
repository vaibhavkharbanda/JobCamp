const Interview = require("../models/interview");
const Student = require("../models/student");
const fs = require("fs");
const { student } = require("./student_controller");

module.exports.downloadCSV2 = async function (req, res) {
    try {
        const array = await  Interview.find({});
        let serialNumber = 1,
            entry = "";
        let fileData =
            "S.No, Name, College, Batch, Placement Status, DSA, WebD, React, Interview Company, Position, Date";

        for await (i of array) {
            entry=
                serialNumber +
                "," +   
                i.companyName +
                "," +
                i.title +
                "," +
                i.date;
                console.log(i.companyName,"-> ");
            for  (j of i.students) {
                Student.findById(j, (err, data) => {
                    if(err){

                    }
                entry+=
                "," +
                data.name +
                "," +
                data.batch +
                "," +
                data.placement_status +
                "," +
                data.dsa_score ;
                
                    
                    
                });
            }
            serialNumber++;
            fileData += "\n" + entry;
        }
        const file = fs.writeFile(
            "assets/downloads/data.csv",
            fileData, function (err, data) {
                if (err) {
                    console.log(err);
                    return res.redirect("back");
                }
                return res.download("assets/downloads/data.csv");
            }
        );

    }

    catch (err) {
        console.log('Error in downloading csv', err);
    }
}


module.exports.downloadCSV = async function (req, res) {
    try{
        let array = await  Student.find({});
        let serialNumber = 1,
            entry = "";
        let fileData =
            "S.No, Name, College, Batch, Placement Status, DSA, WebD, React, Interview Company, Position, Date";

        for (i of array){
            for (j of i.company){
                
                var com= await Interview.findById(j);
                // console.log(i.name+"=> ",com.companyName);
                entry=
                    serialNumber +
                    "," +   
                    i.name+
                    "," +
                    i.college+
                    "," +
                    i.batch+
                    "," +
                    i.placement_status+
                    "," +
                    i.dsa_score+
                    "," +
                    i.webd_score+
                    "," +
                    i.react_score+
                    "," + 
                    com.companyName+
                    "," +
                    com.title+
                    "," +
                    com.date;

                serialNumber++;
                fileData += "\n" + entry;
            }
            
        }

        const file = fs.writeFile(
            "assets/downloads/data.csv",
            fileData, function (err, data) {
                if (err) {
                    console.log(err);
                    return res.redirect("back");
                }
                return res.download("assets/downloads/data.csv");
            }
        );
    }

    catch(err){
        console.log('Error in downloading CSV File',err);
    }
}
    
