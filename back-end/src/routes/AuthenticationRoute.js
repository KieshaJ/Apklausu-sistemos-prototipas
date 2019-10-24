import express from 'express';
import AuthenticationController from '../controllers/AuthenticationController';

const router = express.Router();

router.post('/register', AuthenticationController.register);
router.post('/login', AuthenticationController.login);

module.exports = router;