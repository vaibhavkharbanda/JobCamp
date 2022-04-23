const Student=require('../models/student');


//render to the lists of students
module.exports.home = function(re,res){
    return res.redirect('studentsList');
}

//pushing the student details to the database
module.exports.createStudent = function(req,res){
    if(req.isAuthenticated()){
        Student.create(req.body,function(err,student){
            if(err){
                console.log('error in adding student');
                req.flash('Error in adding student');
                return res.redirect('back');
            }
        });
        return res.redirect('studentsList');
    }
} 

//rendering the  to add student form page
module.exports.student = function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign_in');
    }
    return res.render('add_student',{
        title:"Job Camp | Add Student"
    });
}

module.exports.studentsList = function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }
    Student.find(function(err,student){
        return res.render('students_list',{
           title: "Job Camp | Students List",
           students:student 
        });
    });
}