const User = require('../models/user');



//render the user home page
module.exports.home = function (req,res){
    return res.redirect('/');
}


//siging in for data and generate session using passport
module.exports.createSession = function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

//sigin in page redirect
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        User.findById(req.params.id,function(err,user){
            return res.redirect('/');
        });
    }
    return res.render('user_sign_in',{
        title: "Job Camp | Sign in"
    });

}

//siginig up the new user
module.exports.signUp= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('user_sign_up',{
        title: "Job Camp | Sign Up"
    });
}


//siging out using passport
module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
}

module.exports.create = function (req, res) {
    //validate confirm password
    if (req.body.password != req.body.confirm_password) {
        window.alert('Password does not match');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { req.flash('error','error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { req.flash('error','error in creating user in signing up'); return }
                req.flash('success', "user "+user.name +" Created");
                return res.redirect('/users/sign-in');
            });
        }
        else {
            return res.redirect('back');
        }
    });

}

module.exports.changeDetails = function(req,res){
    if(req.user.id== req.params.id){
        User.findById(req.params.id,function(err,user){
            if(err){
                console.log('unable to edit user: ',err);
            return res.redirect('back');
            }
            return res.render('user_edit',{
                title:"Student Update",
                users:user
            })
        });
    }
}
module.exports.update= function(req,res){
    if(req.user.id== req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}
