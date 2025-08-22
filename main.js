const dotenv = require('dotenv');
const CookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
dotenv.config();
const {errorHandler} = require("./utils/globalErrorHandler.js")
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = require('http').createServer(app);

const dbConnect = require('./database/database.connect.js');
// Routes
const SignerRoute = require('./routes/signer.route.js');
const AdditionalSignerRoute = require('./routes/additionalSigner.route.js');
const WitnessRoute = require('./routes/witness.route.js');
const ObserverRoute = require('./routes/observer.route.js');
dbConnect();
app.use(CookieParser());
app.use(cors());
const model = require("./models/signer.model.js")
app.get('/', () => res.end('Hello from the server!'));

app.use('/signer', SignerRoute)
app.use('/additional-signer', AdditionalSignerRoute)
app.use('/witness', WitnessRoute)
app.use('/observer', ObserverRoute)

// Global Error Handling Middleware----------
app.use(errorHandler)
module.exports = httpServer;