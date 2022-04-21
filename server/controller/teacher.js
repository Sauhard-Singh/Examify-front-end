const Teacher = require('../models/teacher');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/sendlink');
const Test = require('../models/test');
const testsubmitted = require('../models/testsubmitted');
const resetPassword = require('../models/resetPassword');
require('dotenv').config();


exports.register = async(req, res) => {
    try {
        var {firstName, lastName , email, password, branch, sections} =  req.body;
        const ifTeacher = await Teacher.findOne({email});

        if(ifTeacher && ifTeacher.isverified==true)
                return res.status(200).json({success: false, message: 'Teacher Already Exists'});

        password = await bcrypt.hashSync(password , 10);
        
        var teacher;

        const name = firstName + " " + lastName;

        if(ifTeacher){
            ifTeacher.name = name;
            ifTeacher.password = password;
            ifTeacher.branch = branch;
            ifTeacher.sections = sections;

            teacher = await ifTeacher.save();
        }else{
            const newTeacher = new Teacher({name, email, password, branch, sections});
            teacher = await newTeacher.save();
        }

        let subject = "Account Verification token";
        let to = email;
        let from = process.env.EMAIL;
        let text = ` go to link :- ${process.env.frontendLink}/teacherVerify/${teacher.id}`;
        sendEmail({ subject, text, to , from});


        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message});
    }
}


exports.verify = async(req, res) => {
    try {
        const id = req.params.id;

        const teacher = await Teacher.findById(id);

        if(!teacher)
            return res.status(200).json({success: false, message: 'Teacher not found'});

        teacher.isVerified = true;
        await teacher.save();
        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message})
    }
}


exports.login = async(req, res) => {
    try {
        const {email, password} =  req.body;
        const teacher = await Teacher.findOne({ email });

        if (!teacher)
            return res.status(200).send({ success: false, message: 'Teacher Not Found'});

        if(teacher.isVerified == false)
            return res.status(200).send({ success: false, message: 'Teacher Not Found'});

        if (!teacher.comparePassword(password))
            return res.status(200).send({ success: false, message: 'Invalid Password' });

        res.status(200).json({success: true, teacher, token:teacher.generateJWT()});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message})
    }
}


exports.forgot = async(req, res) => {
    try {
        const {email} =  req.body;
        const student = await Teacher.findOne({ email });

        if (!student)
            return res.status(200).send({ success: false, message: 'Student Not Found'});
        

        const isreset = await resetPassword.findOne({email});

        if(!isreset){
            const newReset = new resetPassword({email, type: 'student'});
            const reset = await newReset.save();
            
            let subject = "Reset password token";
            let to = email;
            let from = process.env.EMAIL;
            let text = ` go to link :- ${process.env.frontendLink}/teacherReset/${reset.id}`;
            sendEmail({ subject, text, to , from});

        }else{
            let subject = "Reset password token";
            let to = email;
            let from = process.env.EMAIL;
            let text = ` go to link :- ${process.env.frontendLink}/teacherReset/${isreset.id}`;
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

        const isreset = await resetPassword.findById(id);

        if(!isreset)
            return res.status(404).json({success: false, message: 'not Valid pls try again', type:'student'});

        const teacher = await Teacher.findOne({email: isreset.email});
        password = await bcrypt.hashSync(password , 10);
        teacher.password = password;
        await teacher.save();

        await resetPassword.findByIdAndRemove(id);

        return res.status(200).json({success: true})

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message})
    }
}

exports.profile = async(req, res) => {
    try {
        res.status(200).send({ success: true , teacher: req.teacher});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}


exports.testDetails = async(req,res) => {
    try {
        const teacher = req.teacher;

        if(!teacher)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});
        
            var date = new Date();
            var nowTimeStamp = date.getTime()/1000;
            date.setHours(0,0,0,0);
            var todayTimeStamp = date.getTime()/1000;
            var tomorrow = new Date(date.getTime() + (24 * 60 * 60 * 1000));
            var tomorrowTimeStamp = tomorrow.getTime()/1000;

            const ongoingTest = await Test.find({teacherId : teacher.id}).where('startTime').lt(nowTimeStamp).where('endTime').gt(nowTimeStamp).exec();

            const todayTest = await Test.find({teacherId : teacher.id}).where('startTime').gt(nowTimeStamp).lt(tomorrowTimeStamp).exec();

            const upcomingTest = await Test.find({teacherId : teacher.id}).where('startTime').gt(tomorrowTimeStamp).exec();

            const historyTest = await Test.find({teacherId : teacher.id}).where('endTime').lt(nowTimeStamp).exec();

            res.status(200).json({success: true, ongoingTest, todayTest, upcomingTest, historyTest});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}


exports.teacherSpecificTest = async(req,res) => {
    try {
        const teacher = req.teacher;

        if(!teacher)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});

        const testId = req.params.id;

        const test = await Test.findById(testId);

        if(!test)
            return res.status(400).json({success: false, message: 'Test Not Found'});
        
//         if(test.teacherId.toString() === teacher.id) 
//             return res.status(400).json({success: false, message: 'UnAuthozied Access'});

        const result = await testsubmitted.find({testId}).populate("studentId").exec();
        res.status(200).json({success: true, result, test,message:"check"});

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

exports.studentSpecificResult = async(req,res) => {
    try {
        const teacher = req.teacher;

        if(!teacher)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});

        const testId = req.params.id;

        const result = await testsubmitted.findById(testId).populate('testId');

        if(!result)
            return res.status(400).json({success: false, message: 'Test Not Found'});
        
        res.status(200).json({success: true, result})
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}
