const { body } = require('express-validator');

const register = [
  body('user.email').notEmpty().withMessage('Email is required').isString().withMessage('Email must be a string'),
  body('user.password').notEmpty().withMessage('Password is required').isString().withMessage('Password must be a string'),
  body('user.userName').notEmpty().withMessage('UserName is required').isString().withMessage('UserName must be a string'),
  body('verifyUrl').notEmpty().withMessage('Verify URL is required').isString().withMessage('Verify URL must be a string'),
  body('redirectHost').notEmpty().withMessage('Redirect Host is required').isString().withMessage('Redirect Host must be a string'),
  body('app').notEmpty().withMessage('App is required').isString().withMessage('App must be a string'),
];

const registerValidator = { register };
export default registerValidator;