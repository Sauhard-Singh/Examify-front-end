const Test = require("../models/test");
const TestSubmit = require('../models/testsubmitted');

exports.addTest = async(req, res) => {
    try {
        const teacher = req.teacher;

        if(!teacher)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});

        const {title, startTime, endTime, branch, section, isBranch, totalMarks, questions, isDuration, duration} = req.body;

        const newTest = new Test({teacherId: teacher,title, startTime, endTime, branch, section, isBranch, totalMarks,isDuration, duration, questions});
        const test = await newTest.save();

        res.status(200).json({success: true, test});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}


exports.updateTest = async(req, res) => {
    try {
        const teacher = req.teacher;

        if(!teacher)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});

        const {testId, title, startTime, endTime, branch, section, isBranch, totalMarks,isDuration, duration, questions} = req.body;

        const test = await Test.findByIdAndUpdate(testId, {teacherId: teacher,title, startTime, endTime, branch, section, isBranch, totalMarks, isDuration, duration, questions});

        if(!test)
            return res.status(400).json({success: false, message:'Test not Found'});

        res.status(200).json({success: true, test});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}


exports.deleteTest = async(req, res) => {
    try {
        const teacher = req.teacher;

        if(!teacher)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});

        const testId = req.params.id;

        const test = await Test.findById(testId);

        if(!test)
            return res.status(400).json({success: false, message:'Test Not found'});

        if(test.teacherId.toString() !== teacher.id)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});

        await Test.findByIdAndDelete(testId);

        return res.status(200).json({success: true})

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message});
    }
}


exports.studentTestSubmit  = async(req,res) => {
    try {
        const student = req.student;

        if(!student)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});

        const {testId, submitTime, endTime, totalMarks, answer} = req.body;

        const test = await Test.findById(testId);

        if(!test)
            return res.status(401).json({success: false, message:'Test Not Found'});

        var marks = 0;

        for(var i=0;i<test.questions.length;i++) {
            if(test.questions[i].mcqType == false){
                if(test.questions[i].options[answer[i][0]].status == true)
                    marks = marks + test.questions[i].questionMarks;
            }else{
                var flag = true;

                for(var j=0;j<answer[i].length;j++)
                {   
                    if(test.questions[i].options[answer[i][j]].status == false){
                        flag = false;
                        break;
                    }
                }

                if(flag == true && answer[i].length > 0)
                    marks = marks + test.questions[i].questionMarks;
            }
        }


        const newTestSubmit = new TestSubmit({testId, studentId: student, marks, submitTime, endTime, totalMarks, answer});

        const testSubmit = await newTestSubmit.save();

        res.status(200).json({success: true, testSubmit})

    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message});
    }
}




exports.studentTestDetail  = () => {
    try {
        const student = req.student;

        if(!student)
            return res.status(401).json({success: false, message:'UnAuthozied Accesss'});

        
        
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error', messages: error.message});
    }
}



