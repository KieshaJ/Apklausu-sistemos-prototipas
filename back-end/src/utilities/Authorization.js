import jwt from 'jsonwebtoken';
import userRoleEnum from './UserRoleEnum';

const authorize = (req, res, next, role) => {
    const token = req.header('auth-token');

    throwIfNoToken(token, res);
    verifyToken(token, res, next);
};

const throwIfNoToken = (token, res) => {
    if(!token) {
        return res.status(401).send('Access Denied: No token provided!');
    }
};

const verifyToken = (token, res, next) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role === role) {
            next();
        }
        else{
            return res.status(401).send('Access Denied: Insufficient permissions!');
        };
    }
    catch(error) {
        res.status(401).send('Invalid Token!');
    }
};

const extractRole = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return userRoleEnum[decoded.role];
};

module.exports = {authorize, extractRole};