// controllers/observer.controller.js
const { validationResult } = require('express-validator');
const observerService = require('../services/observer.service');

exports.add = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const session = await observerService.addObserver(req.params.sessionId, req.body);
    res.status(200).json({ message: 'Observer added', session });
};

exports.update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const session = await observerService.updateObserver(
        req.params.sessionId,
        req.body
    );
    res.status(200).json({ message: 'Observer updated', session });
};

exports.remove = async (req, res, next) => {
    const session = await observerService.deleteObserver(
        req.params.sessionId,
        req.params.observer_id
    );
    res.status(200).json({ message: 'Observer deleted', session });
};
