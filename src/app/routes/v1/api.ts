const express = require('express');
const router = new express.Router();
import authController from '../../controllers/v1/authController';
import registerController from '../../controllers/v1/registerController';
import authMiddleware from '../../middleware/authMiddleware';
import authValidator from '../../validations/authValidator';
import registerValidator from '../../validations/registerValidator';

router.post('/register', registerValidator.register, registerController.register);

router.get('/verify-email', registerController.verify);

router.post('/verify-token', authMiddleware.isAuth);

router.post('/login', authValidator.login, authController.login);

router.post('/logout', authController.logout);

router.post('/forgot-password', authValidator.forgot, authController.forgot);

router.post('/reset-password', authValidator.reset, authController.reset);

module.exports = router;
