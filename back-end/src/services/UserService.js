import User from '../models/User';

const user = new User();

const validate = (userDetails) => {
    if(!userDetails.name || !userDetails.surname || !userDetails.email) {
        throw new Error('Required fields not set!');
    }
};

const merge = (oldDetails, newDetails) => {
    oldDetails.status = newDetails.status;
    oldDetails.role = newDetails.role;
    oldDetails.name = newDetails.name;
    oldDetails.surname = newDetails.surname;
    oldDetails.email = newDetails.email;
    oldDetails.lastModifiedDate = Date.now();

    return oldDetails;
};

exports.list = async (filter) => {
    let userDetailsList = await User.find(filter);

    userDetailsList.forEach((userDetails) => {
        userDetails.password = undefined;
    });

    return userDetailsList;
};

exports.save = async (userDetails) => {
    validate(userDetails);

    await User.findById(userDetails._id).exec((error, savedUser) => {
        if(error) {
            throw new Error('Such user does not exist!');
        }

        savedUser = merge(savedUser, userDetails);
        savedUser.save();

        return savedUser;
    });
};

exports.get = async (userId) => {
    try {
        return await User.findOne({_id: userId});
    }
    catch(error) {
        throw new Error('User does not exist!');
    }
};

exports.delete = async (userId) => {
    try {
        return User.deleteOne({_id: userId});
    }
    catch(error) {
        throw new Error('User does not exist!');
    }
};