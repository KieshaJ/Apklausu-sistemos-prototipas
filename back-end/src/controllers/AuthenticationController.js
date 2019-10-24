import AuthenticationService from './../services/AuthenticationService';

exports.register = async (req, res) => {
    const userDetails = req.body;

    try {
        const registeredUser = await AuthenticationService.register(userDetails);
        res.send({status: 200, userDetails: registeredUser});
    }
    catch(error) {
        if(error.name === 'ValidationError') {
            res.send({status: 400, error: error.errors.email.message});
        }
        else {
            res.send({status: 400, error: error.message});
        }
    }
};

exports.login = async (req, res) => {
    const userDetails = req.body;

    try {
        const token = await AuthenticationService.login(userDetails);
        res.send({status: 200, token: token});
    }
    catch(error) {
        res.send({status: 400, error: error.message});
    }
};