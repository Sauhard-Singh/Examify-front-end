const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middlewares/validator');
const teacher= require('../controller/teacher');
const authenticate = require('../middlewares/authenticate');

router.post('/teacherRegister',[
    check('firstName').not().isEmpty().withMessage({success: false, message: 'firstName is Required'}),
    check('lastName').not().isEmpty().withMessage({success: false, message: 'lastName is Required'}),
    check('email').not().isEmpty().withMessage({success: false, message: 'email is Required'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'password is Required'}),
    check('branch').not().isEmpty().withMessage({success: false, message: 'branch is Required'}),
    check('sections').not().isEmpty().withMessage({success: false, message: 'sections is Required'}),
], validate, teacher.register);

router.post('/teacherVerify/:id',[
    check('id').not().isEmpty().withMessage({success: false, message: 'verifyId is Required'}),
], validate, teacher.verify);

router.post('/teacherlogin',[
    check('email').not().isEmpty().withMessage({success: false, message: 'email is Required'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'password is Required'})
], validate, teacher.login);

router.post('/teacherForgot', [
    check('email').not().isEmpty().withMessage({success: false, message: 'email is Required'}),
], validate, teacher.forgot);

router.post('/teacherReset/:id',[
    check('id').not().isEmpty().withMessage({success: false, message: 'resetId is Required'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'password is Required'})
], validate, teacher.reset)

router.get('/teacherProfile', authenticate, teacher.profile);

router.get('/teacherTestDetails', authenticate, teacher.testDetails);

router.get('/teacherSpecificTest/:id', authenticate, teacher.teacherSpecificTest)

router.get('/studentSpecificResult/:id', authenticate, teacher.studentSpecificResult)


module.exports = router;