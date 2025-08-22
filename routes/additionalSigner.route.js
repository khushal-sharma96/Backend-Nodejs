const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const controller = require('../controllers/additionalSigner.controller');

// Add additional signer to session
router.post(
  '/add/:sessionId',
  [
    body('fullName').isLength({ min: 3 }).withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required')
  ],
  controller.add
);

// Update additional signer at specific index
router.put(
  '/edit/:sessionId',
  [
    body('fullName').isLength({ min: 3 }).withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required')
  ],
  controller.update
);

// Delete additional signer at index
router.delete('/:sessionId/:additional_id', controller.remove);

module.exports = router;
