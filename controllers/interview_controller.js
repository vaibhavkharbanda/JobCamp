const Interview = require('../models/interview');

module.exports.home = function (re, res) {
    return res.redirect('studentsList');
}

module.exports.scheduleInterview = function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/sign_in');
    }
    return res.render('add_interview', {
        title: "Job Camp | Add Interview"
    });
}

module.exports.create = function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/sign_in');
    }
    Interview.create(req.body, function (err, interview) {
        if (err) {
            console.log('error in creating Interview:', err);
            req.flash('error', 'Error in creating interview');
            return res.redirect('back');
        }

    });
    return res.redirect('/');

}


module.exports.lists = function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }
    Interview.find(function(err,interview){
        return res.render('company_interviews',{
           title: "Job Camp | Students List",
           interviews:interview 
        });
    });
}


module.exports.profile = function(req,res){
    Interview.findById(req.params.id,function(err,interviewProfile){
        return res.render('interview_profile',{
            title: "Job profile",
            interview_profile: interviewProfile 
        });
    });
}