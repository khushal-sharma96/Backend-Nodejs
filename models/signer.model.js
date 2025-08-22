const mongoose = require('mongoose');

const signerSchema = new mongoose.Schema({
    fullName: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true }
});

const additionalSignerSchema = new mongoose.Schema({
    fullName: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true }
});

const witnessSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    zip: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true }
});

const observerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'translator', 'other'],
        required: true
    },
    otherRole: { type: String }
});

const sessionSchema = new mongoose.Schema({
    signer: { type: signerSchema, required: true },
    additionalSigners: [additionalSignerSchema],
    witnesses: [witnessSchema],
    observers: [observerSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Session', sessionSchema);
