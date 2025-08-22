// services/additionalSigner.service.js
const Session = require('../models/signer.model');
const { isEmailExistInSigner } = require("../helpers/signer.helper")

/**
 * Add an additional signer to a session
 */
const addAdditionalSigner = async (sessionId, signerData) => {
    const session = await Session.findById(sessionId);
    if (!session) throw new Error('Session not found');

    // Check for duplicate email in all participants
    const isEmailExist = await isEmailExistInSigner(sessionId, signerData.email);
    if (isEmailExist) {
        throw new Error('Email must be unique across all participants');
    }

    session.additionalSigners.push(signerData);
    return await session.save();
};

/**
 * Update an additional signer by index
 */
const updateAdditionalSigner = async (sessionId, updatedData) => {
    const session = await Session.findById(sessionId);
    if (!session) throw new Error('Session not found');

    const signerIndex = session.additionalSigners.findIndex((row) => row._id == updatedData?._id);
    
    if (!session.additionalSigners[signerIndex]) {
        throw new Error('Additional signer not found at this index');
    }

    // Check if email is updated.......
    if (session.additionalSigners[signerIndex]?.email != updatedData.email) {
        // Check for duplicate email in all participants
        const isEmailExist = await isEmailExistInSigner(sessionId, updatedData.email);

        if (isEmailExist) {
            throw new Error('Email must be unique across all participants');
        }
    }

    session.additionalSigners[signerIndex] = updatedData;
    return await session.save();
};

/**
 * Delete an additional signer by index
 */
const deleteAdditionalSigner = async (sessionId, additional_id) => {
    const session = await Session.findById(sessionId);
    if (!session) throw new Error('Session not found');

    const signerIndex = session.additionalSigners.findIndex((row) => row._id == additional_id);

    if (!session.additionalSigners[signerIndex]) {
        throw new Error('Additional signer not found at this index');
    }

    session.additionalSigners.splice(signerIndex, 1);
    return await session.save();
};

module.exports = {
    addAdditionalSigner,
    updateAdditionalSigner,
    deleteAdditionalSigner
};
