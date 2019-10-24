import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import UserRoleEnum from './../utilities/UserRoleEnum';
import UserStatusEnum from './../utilities/UserStatusEnum';

let userSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: Object.values(UserStatusEnum),
        default: UserStatusEnum.ACTIVE
    },
    name: {
        type: String,
        required: true,
        max: 255
    },
    surname: {
        type: String,
        required: true,
        max: 255
    },
    companyName: {
        type: String,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    role: {
        type: String,
        enum: Object.values(UserRoleEnum),
        default: UserRoleEnum.USER
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(uniqueValidator, {message: 'Email is already taken!'});

module.exports = mongoose.model('User', userSchema);