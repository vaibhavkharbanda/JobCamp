const Interview = require('../models/interview');
const Student = require('../models/student');



module.exports.home = function (re, res) {
    return res.redirect('studentsList');
}

module.exports.scheduleInterview = function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/sign-in');
    }
    return res.render('add_interview', {
        title: "Job Camp | Add Interview"
    });
}

module.exports.create = function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/sign-in');
    }
    Interview.create(req.body, function (err, interview) {
        if (err) {
            req.flash('error', 'Error in creating interview');
            return res.redirect('back');
        }
        req.flash('success','Interview Created');
        

    });
    return res.redirect('/interviews/interviews-lists');    

}


module.exports.lists = function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/sign-in');
    }
    Interview.find(function (err, interview) {
        return res.render('company_interviews', {
            title: "Job Camp | Students List",
            interviews: interview
        });
        
    });
}


module.exports.profile = function (req, res) {
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }
    
     Interview.findById(req.params.id, async function (err, interviewProfile) {
          try{
            await Student.find(function (err, students) {
                return res.render('interview_profile', {
                    title: "Job profile",
                    interview_profile: interviewProfile,
                    students: students
                });
            })
          }
          catch(err){
            console.log(err);
          }
    });
}


module.exports.apply = function (req, res) {
    Interview.findById(req.params.id, function (err, interview) {
        if (err) {
            console.log('Error in finding Interview');
            req.flash("error", "Unable to find interview ");
            res.redirect('back');
        }
        else {
            Student.findById(req.body["apply-interview"], function (err, student) {
                if (err) {
                    console.log('Error in fetching student and interview');
                    req.flash('error', 'Error in fetching student and interview');
                }
                else {
                    if (interview.students.includes(student.id)) {
                        req.flash("error", "Student already applied");
                    }
                    else {
                        student.company.push(interview);
                        interview.students.push(student);
                        interview.save();
                        student.save();
                        console.log(interview.students);
                        req.flash('success', "appllied for interview");
                        
                    }
                }

            });
        }

    });
    res.redirect('back');
}