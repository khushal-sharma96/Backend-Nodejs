const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const SignerController = require('../controllers/signer.controller');

router.get('/', authMiddleware, SignerController.getSigner);

router.post('/add', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 letters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters long'),
], SignerController.addSigner);

router.put('/edit/:id', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 letters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters long'),
], SignerController.editSigner);

module.exports = router;