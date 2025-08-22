const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const controller = require('../controllers/observer.controller');

router.post(
    '/add/:sessionId',
    [
        body('fullName').notEmpty().withMessage('Full name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('phone').notEmpty().withMessage('Phone is required'),
        body('role').notEmpty().withMessage('Role is required'),
        body('otherRole')
            .if(body('role').equals('other'))
            .notEmpty()
            .withMessage('Other Contact Role is required when role is "Other"')
    ],
    controller.add
);

router.put(
    '/edit/:sessionId',
    [
        body('fullName').notEmpty().withMessage('Full name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('phone').notEmpty().withMessage('Phone is required'),
        body('role').notEmpty().withMessage('Role is required'),
        body('otherRole')
            .if(body('role').equals('Other'))
            .notEmpty()
            .withMessage('Other Contact Role is required when role is "Other"')
    ],
    controller.update
);

router.delete('/:sessionId/:observer_id', controller.remove);

module.exports = router;
