// services/signer.service.js
const Session = require('../models/signer.model');

/**
 * Get all signers from all sessions
 */
const getAllSigners = async () => {
    const session = await Session.findOne({});
    return session;
};

/**
 * Get all signers from all sessions
 */
const getSignerById = async (id) => {
    const sessions = await Session.find(id, 'signer');
    return sessions.map(session => session.signer);
};

/**
 * Create a new session with a signer
 */
const addSignerToSession = async (signerData) => {
    const { email, fullName } = signerData;

    const newSession = new Session({
        signer: { email, fullName },
        additionalSigners: [],
        witnesses: [],
        observers: []
    });

    return await newSession.save();
};

/**
 * Update signer in a session by session ID
 */
const updateSigner = async (sessionId, updatedData) => {
    const session = await Session.findById(sessionId);

    if (!session) {
        throw new Error('Session not found');
    }

    session.signer.email = updatedData.email;
    session.signer.fullName = updatedData.fullName;

    return await session.save();
};

/**
 * Delete a session by ID (and thus, delete the signer too)
 */
const deleteSignerSession = async (sessionId) => {
    const deleted = await Session.findByIdAndDelete(sessionId);
    if (!deleted) {
        throw new Error('Session not found');
    }
    return deleted;
};

module.exports = {
    getAllSigners,
    addSignerToSession,
    updateSigner,
    deleteSignerSession,
    getSignerById
};
