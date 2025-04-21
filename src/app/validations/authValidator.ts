const { body } = require('express-validator');

const login = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isString()
    .withMessage('Email must be a string'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string'),
];

const forgot = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isString()
    .withMessage('Email must be a string'),
  body('domain')
    .notEmpty()
    .withMessage('Domain is required')
    .isString()
    .withMessage('Domain must be a string'),
];

const reset = [
  body('token')
    .notEmpty()
    .withMessage('Token is required')
    .isString()
    .withMessage('Token must be a string'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string'),
];

const authValidator = { login, forgot, reset };
export default authValidator;
