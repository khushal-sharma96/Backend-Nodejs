const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const SignerController = require('../controllers/signer.controller');
const {asyncHandler} = require("../utils/asyncHandler")

router.get('/',asyncHandler( SignerController.getSigner));

router.post('/add', [
  body('email').isEmail().withMessage('Invalid email address'),
  body('fullName').isLength({ min: 3 }).withMessage('Full name must be at least 3 characters')
],asyncHandler( SignerController.addSigner));

router.put('/edit/:id', [
  body('email').isEmail().withMessage('Invalid email address'),
  body('fullName').isLength({ min: 3 }).withMessage('Full name must be at least 3 characters')
], asyncHandler(SignerController.editSigner));

module.exports = router;
