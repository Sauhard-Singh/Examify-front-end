const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const validate = require('../middlewares/validator');
const Branch = require('../controller/branch');


router.post('/branch',[
    check('branchName').not().isEmpty().withMessage({success: false, message: 'branchName is Required'}),
    check('sections').not().isEmpty().withMessage({success: false, message: 'sections is Required'})
], validate, Branch.addBranch);

router.get('/branch', Branch.getBranch);


module.exports = router;