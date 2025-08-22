const Session = require('../models/signer.model');
const getAllRelatedMails = async (session) => {
    // Check for duplicate email in all participants
    const emails = [
        session.signer.email,
        ...session.additionalSigners.map(s => s.email),
        ...session.witnesses.map(w => w.email),
        ...session.observers.map(o => o.email)
    ];
    return emails;
}
exports.getAllRelatedMails = getAllRelatedMails;
exports.isEmailExistInSigner = async (sessionId, email) => {
    const session = await Session.findById(sessionId);
    if (session) {
        const emails = await getAllRelatedMails(session);
        if (emails.indexOf(email)>=0) {
            return true;
        }
        return false;
    }
}