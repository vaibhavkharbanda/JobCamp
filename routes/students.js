const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student_controller');





router.get('/',studentController.home);

router.get('/addStudent',studentController.student)
router.post('/createStudent',studentController.createStudent);
router.get('/studentsList',studentController.studentsList);



module.exports = router;    