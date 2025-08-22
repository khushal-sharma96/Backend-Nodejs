const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const ObserverController = require('../controllers/observer.controller');

router.get('/', authMiddleware, ObserverController.getSigner);

router.post('/add', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 letters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters long'),
], ObserverController.addSigner);

router.put('/edit/:id', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 letters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters long'),
], ObserverController.editSigner);

module.exports = router;