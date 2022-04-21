const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('dotenv').config();

const branchSchema = new Schema({
    branchName:{
        type: String,
        required: 'mcqtitle is Required'
    },
    sections:[{
        type: String,
        default: 0
    }]
});


module.exports = mongoose.model('branch', branchSchema);