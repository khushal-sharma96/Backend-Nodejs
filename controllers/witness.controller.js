// controllers/witness.controller.js
const { validationResult } = require('express-validator');
const witnessService = require('../services/witness.service');

exports.add = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const session = await witnessService.addWitness(req.params.sessionId, req.body);
    res.status(200).json({ message: 'Witness added', session });
};

exports.update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const session = await witnessService.updateWitness(
        req.params.sessionId,
        req.body
    );
    res.status(200).json({ message: 'Witness updated', session });
};

exports.remove = async (req, res, next) => {
    const session = await witnessService.deleteWitness(
        req.params.sessionId,
        req.params.witness_id
    );
    res.status(200).json({ message: 'Witness deleted', session });
};
