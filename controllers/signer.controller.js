const Session = require('../models/signer.model');
const { validationResult } = require('express-validator');
const signerService = require("../services/signer.service");
// Get all signers from all sessions
exports.getSigner = async (req, res) => {
    const signers = await signerService.getAllSigners();
    res.status(200).json(signers);
};

// Add a signer by creating a new session
exports.addSigner = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const newSession = await signerService.addSignerToSession(req.body);
    res.status(201).json({ message: 'Signer added and session created successfully', session:newSession });
};

// Edit signer details in an existing session
exports.editSigner = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const updated = await signerService.updateSigner(req.params.id, req.body);
    res.status(200).json({ message: 'Signer updated successfully', session:updated });
};
