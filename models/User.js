const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique:1    //똑같은 이메일을 쓰지 못하도록
    },
    password: {
        type: String,
        maxlength: 50
    },
    role: { //유저는 관리자가 될 수도, 일반인이 될 수도
        type: Number,
        default: 0  //0: 일반 유저, 1: 관리자
    },
    image: String,
    token: {    //유효성 관리
        type: String
    },
    tokenExp: { //유효 기간
        type: Number
    }
})

userSchema.pre('save', function(next){
    var user = this;
    if (user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    }
})

const User = mongoose.model('User', userSchema)

module.exports={User};