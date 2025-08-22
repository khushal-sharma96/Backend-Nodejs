const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const controller = require('../controllers/witness.controller');

router.post(
    '/add/:sessionId',
    [
        body('fullName').isLength({ min: 3 }).withMessage('Full name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('zip').notEmpty().withMessage('ZIP is required'),
        body('address').notEmpty().withMessage('Address is required'),
        body('state').notEmpty().withMessage('State is required')
    ],
    controller.add
);

router.put(
    '/edit/:sessionId',
    [
        body('fullName').isLength({ min: 3 }).withMessage('Full name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('zip').notEmpty().withMessage('ZIP is required'),
        body('address').notEmpty().withMessage('Address is required'),
        body('state').notEmpty().withMessage('State is required')
    ],
    controller.update
);

router.delete('/:sessionId/:witness_id', controller.remove);

module.exports = router;
