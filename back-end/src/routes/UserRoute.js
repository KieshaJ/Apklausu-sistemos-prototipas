import express from 'express';
import UserController from '../controllers/UserController';UserController

const router = express.Router();

router.post('/list', UserController.list);
router.post('/save', UserController.save);
router.get('/get', UserController.get);
router.delete('/delete', UserController.delete);

module.exports = router;