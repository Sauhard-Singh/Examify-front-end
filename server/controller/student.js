const Student = require('../models/student');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/sendlink');
const Test = require('../models/test');
const testsubmitted = require('../models/testsubmitted');
const resetpassword = require('../models/resetPassword');
var moment = require('moment'); 
require('dotenv').config();



exports.register = async(req, res) => {
    try {
        var {firstName, lastName , email, password, branch, section} =  req.body;
        const ifStudent = await Student.findOne({email});

        if(ifStudent && ifStudent.isVerified==true)
                return res.status(200).json({success: false, message: 'Student Already Exists'});

        password = await bcrypt.hashSync(password , 10);
        
        var student;

        const name = firstName + " " + lastName;

        if(ifStudent){
            ifStudent.name = name;
            ifStudent.password = password;
            ifStudent.branch = branch;
            ifStudent.section = section;

            student = await ifStudent.save();
        }else{
            const newStudent = new Student({name, email, password, branch, section});
            student = await newStudent.save();
        }

        let subject = "Account Verification token";
        let to = email;
        let from = process.env.EMAIL;
        let text = ` go to link :- ${process.env.frontendLink}/studentVerify/${student.id}`;
        sendEmail({ subject, text, to , from});
        
        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message});
    }
}


exports.verify = async(req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findById(id);

        if(!student)
            return res.status(200).json({success: false, message: 'Student not found'});

        student.isVerified = true;
        await student.save();
        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message})
    }
}

exports.login = async(req, res) => {
    try {
        const { email, password} =  req.body;
        const student = await Student.findOne({ email });

        if (!student)
            return res.status(200).send({ success: false, message: 'Student Not Found'});

        if(student.isVerified == false)
            return res.status(200).send({ success: false, message: 'Student Not Found'});

        if (!student.comparePassword(password))
            return res.status(200).send({ success: false, message: 'Invalid Password' });

        res.status(200).json({success: true, student, token:student.generateJWT()});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message})
    }
}


exports.forgot = async(req, res) => {
    try {
        const {email} =  req.body;
        const student = await Student.findOne({ email });

        if (!student)
            return res.status(200).send({ success: false, message: 'Student Not Found'});
        
        const isreset = await resetpassword.findOne({email});

        if(!isreset){
            const newReset = new resetpassword({email, type: 'student'});

            const reset = await newReset.save();

            let subject = "Reset Password token";
            let to = email;
            let from = process.env.EMAIL;
            let text = ` go to link :- $${process.env.frontendLink}/studentReset/${reset.id}`;
            sendEmail({ subject, text, to , from});

        }else{
            let subject = "Reset Password token";
            let to = email;
            let from = process.env.EMAIL;
            let text = ` go to link :- $${process.env.frontendLink}/studentReset/${isreset.id}`;
            sendEmail({ subject, text, to , from});
        }

        

        return res.status(200).json({success: true});
        
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message})
    }
}


exports.reset = async(req, res) => {
    try {
        const id = req.params.id;
        var {password} = req.body

        const isreset = await resetpassword.findById(id);

        if(!isreset)
            return res.status(404).json({success: false, message: 'not Valid pls try again', type:'student'});

        const student = await Student.findOne({email: isreset.email});
        password = await bcrypt.hashSync(password , 10);
        student.password = password;
        await student.save();

        await resetpassword.findByIdAndRemove(id);

        return res.status(200).json({success: true})

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message})
    }
}


exports.profile = async(req, res) => {
    try {
        res.status(200).send({ success: true , student: req.student});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}


exports.studentTestDetails  = async(req, res) => {
    try {
        const student = req.student;

        if(!student)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});
            
            var date = new Date();
            var nowTimeStamp = date.getTime()/1000;
            date.setHours(0,0,0,0);
            var todayTimeStamp = date.getTime()/1000;

            var tomorrow = new Date(date.getTime() + (24 * 60 * 60 * 1000));
            var tomorrowTimeStamp = tomorrow.getTime()/1000;

            const sections = ["null", student.section];

            const ongoingTest = await Test.find({branch: student.branch}).where('section').in(sections).where('startTime').lt(nowTimeStamp).where('endTime').gt(nowTimeStamp).exec();

            const todayTest = await Test.find({branch: student.branch}).where('section').in(sections).where('startTime').gt(nowTimeStamp).lt(tomorrowTimeStamp).exec();

            const upcomingTest = await Test.find({branch: student.branch}).where('section').in(sections).where('startTime').gt(tomorrowTimeStamp).exec();
            
            const historyTest = await Test.find({branch: student.branch}).where('section').in(sections).where('endTime').lt(nowTimeStamp).exec();
            const testGiven = await testsubmitted.find({studentId: student.id});

            res.status(200).json({success: true, ongoingTest, todayTest, upcomingTest, historyTest, testGiven });
        
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message});
    }
}


exports.studentResult = async(req,res) => {
    try {
        const student = req.student;

        if(!student)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});

        const testsubmitId = req.params.id;

        const testsubmit = await testsubmitted.findById(testsubmitId).populate('testId').exec();

        if(!testsubmit)
            return res.status(400).json({success: false, message:'Test Not Found'});

        res.status(200).json({success: true, testsubmit});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message});
    }
}


exports.specificTest = async(req, res) => {
    try {
        const student = req.student;

        if(!student)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});
    
        const testId = req.params.id;
        
        const testsubmit = await testsubmitted.findOne({testId, studentId: student.id});
        
        if(testsubmit)
            return res.status(200).json({sucess: false, message: 'Test Already Given'});
    
        const test = await Test.findById(testId);
    
        if(!test)
            return res.status(400).json({success: false, message:'Test Not Found'});
    
        res.status(200).json({success: true, test});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message});
    }
}
