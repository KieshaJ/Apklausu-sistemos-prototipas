import UserService from './../services/UserService';

exports.list = async (req, res) => {
    const filter = req.body;

    try {
        const userList = await UserService.list(filter);
        res.send({status: 200, userDetailsList: userList});
    }
    catch(error) {
        res.send({status: 400, error: error.message});
    }
};

exports.save = async (req, res) => {
    let userDetails = req.body;

    try {
        await UserService.save(userDetails);
        res.send({status: 200, userDetails: userDetails});
    }
    catch(error) {
        res.send({status: 400, error: error.message});
    }
};

exports.get = async (req, res) => {
    const userId = req.body;

    try {
        const userDetails = await UserService.get(userId);
        userDetails.password = undefined;
        res.send({status: 200, userDetails: userDetails});
    }
    catch(error) {
        res.send({status: 400, error: error.message});
    }
};

exports.delete = async (req, res) => {
    const userId = req.body;

    try {
        const deleted = await UserService.delete(userId);
        res.send({status: 200, deleted: deleted});
    }
    catch(error) {
        res.send({status: 400, error: error.message});
    }
};