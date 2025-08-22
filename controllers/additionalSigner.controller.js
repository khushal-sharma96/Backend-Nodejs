// controllers/additionalSigner.controller.js
const { validationResult } = require('express-validator');
const additionalSignerService = require('../services/additionalSigner.service');

exports.add = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const updatedSession = await additionalSignerService.addAdditionalSigner(req.params.sessionId, req.body);
    res.status(200).json({ message: 'Additional signer added', session: updatedSession });
};

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const updatedSession = await additionalSignerService.updateAdditionalSigner(
        req.params.sessionId,
        req.body
    );
    res.status(200).json({ message: 'Additional signer updated', session: updatedSession });
};

exports.remove = async (req, res) => {
    const updatedSession = await additionalSignerService.deleteAdditionalSigner(
        req.params.sessionId,
        req.params.additional_id
    );
    res.status(200).json({ message: 'Additional signer removed', session: updatedSession });
};
