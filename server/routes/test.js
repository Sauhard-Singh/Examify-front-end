const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middlewares/validator');
const test= require('../controller/test');
const authenticate = require('../middlewares/authenticate');


//Student test
router.post('/studentTestSubmit', authenticate, [
    check('testId').not().isEmpty().withMessage({success: false, message: 'testId is Required'}),
    check('submitTime').not().isEmpty().withMessage({success: false, message: 'submitTime is Required'}),
    check('endTime').not().isEmpty().withMessage({success: false, message: 'endTime is Required'}),
    check('totalMarks').not().isEmpty().withMessage({success: false, message: 'totalMarks is Required'}),
    check('answer').not().isEmpty().withMessage({success: false, message: 'answer is Required'}),
], validate, test.studentTestSubmit);

// router.post('/submittest', authenticate, [
//     check('testId').not().isEmpty().withMessage({success: false, message: 'testId is Required'}),
//     //More will required
// ], validate, test.submittest);

// router.get('/testmarks', authenticate, [
//     check('testId').not().isEmpty().withMessage({success: false, message: 'testId is Required'}),
// ], validate, test.testmarks);


//teacher test

router.post('/addTest', authenticate, [
    check('title').not().isEmpty().withMessage({success: false, message: 'title is Required'}),
    check('startTime').not().isEmpty().withMessage({success: false, message: 'startTime is Required'}), 
    check('endTime').not().isEmpty().withMessage({success: false, message: 'endTime is Required'}),
    check('isBranch').not().isEmpty().withMessage({success: false, message: 'isBranch is Required'}),
    check('totalMarks').not().isEmpty().withMessage({success: false, message: 'totalMarks is Required'}),
    check('isDuration').not().isEmpty().withMessage({success: false, message: 'isDuration is Required'}),
    check('questions.*.questionTitle').not().isEmpty().withMessage({success: false, message: 'Question title is Required'}),
    check('questions.*.mcqType').not().isEmpty().withMessage({success: false, message: 'questionType is Required'}), 
    check('questions.*.questionMarks').not().isEmpty().withMessage({success: false, message: 'mcqQuestions is Required'}),
    check('questions.*.options.*.option').not().isEmpty().withMessage({success: false, message: 'mcqTitle is required'}),
    check('questions.*.options.*.status').not().isEmpty().withMessage({success: false, message: 'answer is required'}),
], validate, test.addTest);

router.put('/updateTest', authenticate, [
    check('testId').not().isEmpty().withMessage({success: false, message: 'testId is Required'}),
    check('title').not().isEmpty().withMessage({success: false, message: 'title is Required'}),
    check('startTime').not().isEmpty().withMessage({success: false, message: 'startTime is Required'}), //not reuired
    check('endTime').not().isEmpty().withMessage({success: false, message: 'endTime is Required'}),
    check('isBranch').not().isEmpty().withMessage({success: false, message: 'isBranch is Required'}),
    check('totalMarks').not().isEmpty().withMessage({success: false, message: 'totalMarks is Required'}),
    check('isDuration').not().isEmpty().withMessage({success: false, message: 'isDuration is Required'}),
    check('questions.*.questionTitle').not().isEmpty().withMessage({success: false, message: 'Question title is Required'}),
    check('questions.*.mcqType').not().isEmpty().withMessage({success: false, message: 'questionType is Required'}), //not required
    check('questions.*.questionMarks').not().isEmpty().withMessage({success: false, message: 'mcqQuestions is Required'}),
    check('questions.*.options.*.option').not().isEmpty().withMessage({success: false, message: 'mcqTitle is required'}),
    check('questions.*.options.*.status').not().isEmpty().withMessage({success: false, message: 'answer is required'}),
], validate, test.updateTest);

router.delete('/deleteTest/:id', authenticate, [
    check('id').not().isEmpty().withMessage({success: false, message: 'testId is Required'}),
], validate, test.deleteTest);


module.exports = router;