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
                req.flash('error','Error in adding student');
                return res.redirect('back');
            }
            req.flash('success','<%=student.name%> added successfully')
        });
        return res.redirect('studentsList');
    }
} 

//rendering the  to add student form page
module.exports.student = function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }
    return res.render('add_student',{
        title:"Job Camp | Add Student"
    });
}

module.exports.studentsList = async function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }
    await Student.find(function(err,student){
        return res.render('students_list',{
           title: "Job Camp | Students List",
           students:student 
        });
    });
}

module.exports.profile = async function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }
    await Student.findById(req.params.id,function(err,student){
        try{
            return res.render('student_profile',{
                title:"Student Profile",
                students:student
            });
        }
        catch(err){
            console.log('Unable to find the Student: ',err);
        }
        
    });
}


module.exports.edit = function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }
    Student.findById(req.params.id,function(err,student){
        if(err){
            console.log('unable to edit student: ',err);
            return res.redirect('back');
        }

        return res.render('student_edit',{
            title:"Student Update",
            students:student
        });
    });
}


module.exports.update = function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }
    Student.findByIdAndUpdate(req.params.id,req.body,function(err,student){
        req.flash('success','Student Updated');
    });
    return res.redirect('/students/studentsList');
}