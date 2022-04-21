const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();


const testSubmittedSchema = new Schema({
    testId:{
        type: Schema.Types.ObjectId,
        ref: 'test'
    },
    studentId:{
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    marks:{
        type: Number
    },
    submitTime:{
        type: Number
    },
    endTime:{
        type: Number
    },
    totalMarks:{
        type: Number
    },
    answer:[[{type: Number}]]
}, { timestamps: true });



module.exports = mongoose.model('testSubmit', testSubmittedSchema);
