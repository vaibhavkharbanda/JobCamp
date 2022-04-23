const express = require('express');
const router = express.Router();

const interviewController = require('../controllers/interview_controller');


router.get('/',interviewController.home);
router.get('/add-interview',interviewController.scheduleInterview);
router.post('/post-interview',interviewController.create);
router.get('/interviews-lists',interviewController.lists);
router.get('/interview-profile/:id',interviewController.profile);




module.exports = router;    