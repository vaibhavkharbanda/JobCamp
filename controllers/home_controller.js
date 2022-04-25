const Interview = require('../models/interview');


module.exports.home = function (req, res) {

    Interview.find(function (err, interview) {
        return res.render('home', {
            title: "Home",
            interviews: interview
        });
});
}