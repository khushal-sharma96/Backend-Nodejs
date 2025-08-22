// services/witness.service.js
const Session = require('../models/signer.model');
const { isEmailExistInSigner } = require("../helpers/signer.helper");

/**
 * Add a witness to a session
 */
const addWitness = async (sessionId, witnessData) => {
    const session = await Session.findById(sessionId);
    if (!session) throw new Error('Session not found');

    const isEmailExist = await isEmailExistInSigner(sessionId, witnessData.email);
    if (isEmailExist) {
        throw new Error('Email must be unique across all participants');
    }

    session.witnesses.push(witnessData);
    return await session.save();
};

/**
 * Update a witness by index
 */
const updateWitness = async (sessionId, updatedData) => {
    const session = await Session.findById(sessionId);
    if (!session) throw new Error('Session not found');

    const witnessIndex = session.witnesses.findIndex((row) => row._id == updatedData?._id);

    if (!session.witnesses[witnessIndex]) {
        throw new Error('Witness not found at this index');
    }

    // Check if email is updated
    if (session.witnesses[witnessIndex].email !== updatedData.email) {
        const isEmailExist = await isEmailExistInSigner(sessionId, updatedData.email);
        if (isEmailExist) {
            throw new Error('Email must be unique across all participants');
        }
    }

    session.witnesses[witnessIndex] = updatedData;
    return await session.save();
};

/**
 * Delete a witness by index
 */
const deleteWitness = async (sessionId, witness_id) => {
    const session = await Session.findById(sessionId);
    if (!session) throw new Error('Session not found');


    const witnessIndex = session.witnesses.findIndex((row) => row._id == witness_id);
    if (!session.witnesses[witnessIndex]) {
        throw new Error('Witness not found at this index');
    }

    session.witnesses.splice(witnessIndex, 1);
    return await session.save();
};

module.exports = {
    addWitness,
    updateWitness,
    deleteWitness
};
