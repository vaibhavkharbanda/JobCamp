const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student_controller');
const { downloadCSV } = require("../controllers/download_controller");





router.get('/',studentController.home);

router.get('/addStudent',studentController.student)
router.post('/createStudent',studentController.createStudent);
router.get('/studentsList',studentController.studentsList);
router.get('/csv', downloadCSV);
router.get('/profile/:id',studentController.profile);
router.get('/edit/:id',studentController.edit);
router.post('/update/:id',studentController.update);

module.exports = router;    