const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const optionSchema = new Schema({
    option:{
        type: String,
        required: 'mcqtitle is Required'
    },
    status:{
        type: Boolean,
        default: false
    },
});

const QuestionSchema = new Schema({
    questionTitle:{
        type: String,
        required: 'title is Required'
    },
    mcqType:{
        type: Boolean,
        default: false
    },
    questionMarks:{
        type: Number,
    },
    options:[{
        type: optionSchema
    }]
});


const testSchema = new Schema({
    teacherId:{
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    },
    title:{
        type: String
    },
    startTime:{
        type: Number
    },
    endTime:{
        type: Number
    },
    branch:{
        type: String
    },
    section:{
        type: String,
        default: "null"
    },
    isBranch:{
        type: Boolean,
        default: false
    },
    totalMarks:{
        type: Number
    },
    isDuration:{
        type: Boolean,
        default: false
    },
    duration:{
        type: Number
    },
    questions:[{
        type: QuestionSchema
    }]
}, { timestamps: true });



module.exports = mongoose.model('test', testSchema);