// services/observer.service.js
const Session = require('../models/signer.model');
const { isEmailExistInSigner } = require('../helpers/signer.helper');

/**
 * Add an observer to a session
 */
const addObserver = async (sessionId, observerData) => {
    const session = await Session.findById(sessionId);
    if (!session) throw new Error('Session not found');

    const isEmailExist = await isEmailExistInSigner(sessionId, observerData.email);
    if (isEmailExist) throw new Error('Email must be unique across all participants');

    session.observers.push(observerData);
    return await session.save();
};

/**
 * Update an observer by index
 */
const updateObserver = async (sessionId, updatedData) => {
    const session = await Session.findById(sessionId);
    if (!session) throw new Error('Session not found');

    const observerIndex = session.observers.findIndex((row) => row._id == updatedData?._id);
    
    if (!session.observers[observerIndex]) throw new Error('Observer not found at this index');

    if (session.observers[observerIndex].email !== updatedData.email) {
        const isEmailExist = await isEmailExistInSigner(sessionId, updatedData.email);
        if (isEmailExist) throw new Error('Email must be unique across all participants');
    }

    session.observers[observerIndex] = updatedData;
    return await session.save();
};

/**
 * Delete an observer by index
 */
const deleteObserver = async (sessionId, observer_id) => {
    const session = await Session.findById(sessionId);
    if (!session) throw new Error('Session not found');

    const observerIndex = session.observers.findIndex((row) => row._id == observer_id);

    if (!session.observers[observerIndex]) throw new Error('Observer not found at this index');

    session.observers.splice(observerIndex, 1);
    return await session.save();
};

module.exports = {
    addObserver,
    updateObserver,
    deleteObserver
};
