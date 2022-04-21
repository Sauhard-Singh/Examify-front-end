const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middlewares/validator');
const student = require('../controller/student');
const authenticate = require('../middlewares/authenticate');

router.post('/studentRegister',[
    check('firstName').not().isEmpty().withMessage({success: false, message: 'firstName is Required'}),
    check('lastName').not().isEmpty().withMessage({success: false, message: 'lastName is Required'}),
    check('email').not().isEmpty().withMessage({success: false, message: 'email is Required'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'password is Required'}),
    check('branch').not().isEmpty().withMessage({success: false, message: 'branch is Required'}),
    check('section').not().isEmpty().withMessage({success: false, message: 'section is Required'}),
], validate, student.register);

router.post('/studentVerify/:id',[
    check('id').not().isEmpty().withMessage({success: false, message: 'verifyId is Required'}),
], validate, student.verify);


router.post('/studentlogin',[
    check('email').not().isEmpty().withMessage({success: false, message: 'email is Required'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'password is Required'})
], validate, student.login);

router.post('/studentForgot', [
    check('email').not().isEmpty().withMessage({success: false, message: 'email is Required'}),
], validate, student.forgot);

router.post('/studentReset/:id',[
    check('id').not().isEmpty().withMessage({success: false, message: 'resetId is Required'}),
    check('password').not().isEmpty().withMessage({success: false, message: 'password is Required'})
], validate, student.reset)

router.get('/studentProfile', authenticate, student.profile);

router.get('/studentTestDetails', authenticate, student.studentTestDetails);

router.get('/studentResult/:id', authenticate, student.studentResult);

router.get('/specificTest/:id', authenticate, student.specificTest);

module.exports = router;
