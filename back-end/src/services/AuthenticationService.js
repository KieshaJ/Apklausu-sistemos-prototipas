import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const validate = (userDetails) => {
    if(!userDetails.name || !userDetails.surname || !userDetails.email || !userDetails.password) {
        throw new Error('Required fields not set!');
    }

    if(userDetails.password.length < 6) {
        throw new Error('Password is too short!');
    }

    if(userDetails.password.length > 32) {
        throw new Error('Password is too long!');
    }
};

exports.register = async (userDetails) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);

    validate(userDetails);

    const user = new User({
        status: userDetails.status,
        name: userDetails.name,
        surname: userDetails.surname,
        companyName: userDetails.companyName,
        email: userDetails.email,
        password: hashedPassword,
        role: userDetails.role
    });

    return await user.save();
};

exports.login = async (userDetails) => {
    const user = await User.findOne({email: userDetails.email});

    if(user) {
        const passwordIsValid = await bcrypt.compare(userDetails.password, user.password);

        if(passwordIsValid) {
            return jwt.sign({_id: user._id, role: user.role, name: user.name, surname: user.surname}, process.env.JWT_SECRET);
        }
        else {
            throw new Error('Email or password incorrect!');
        }
    }
    else {
        throw new Error('Email or password incorrect!');
    }
};