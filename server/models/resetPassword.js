const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('dotenv').config();

const resetSchema = new Schema({
    email:{
        type: 'string',
    },
    type:{
        type: 'string',
    }
});


module.exports = mongoose.model('resetPassword', resetSchema);