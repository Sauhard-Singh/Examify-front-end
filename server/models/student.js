const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();


const studentSchema = new Schema({
    name:{
        type: String,
        required: 'Name is Required',
    },
    email:{
        type: String,
        unique: true,
        required: 'Email is Required',
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        required: 'Password is Required',
    },
    branch:{
        type: String,
        required: 'Branch is Required',
    },
    section:{
        type: String,
        required: 'Section is Required',
    },
    testSubmitted:[{ 
        type: Schema.Types.ObjectId,
        ref: 'testSubmitted'
    }]
}, { timestamps: true });


studentSchema.methods.generateJWT = function(){
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 360);

    let payload = {
        id: this._id,
        type: 'student'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

studentSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

studentSchema.methods.compareOTP = function (otp){
    return bcrypt.compareSync(otp, this.otp);
}


module.exports = mongoose.model('student', studentSchema);