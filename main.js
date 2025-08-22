const dotenv = require('dotenv');
const CookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
dotenv.config();
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = require('http').createServer(app);

const dbConnect = require('./database/database.connect.js');
// Routes
const SignerRoute = require('./routes/signer.route.js');
const AdditionalSignerRoute = require('./routes/signer.route.js');
const WitnessRoute = require('./routes/signer.route.js');
const ObserverRoute = require('./routes/signer.route.js');
dbConnect();
app.use(CookieParser());
app.use(cors());

app.get('/', () => res.end('Hello from the server!'));

app.use('/signer', SignerRoute)
app.use('/additional-signer', AdditionalSignerRoute)
app.use('/witness', WitnessRoute)
app.use('/observer', ObserverRoute)

module.exports = httpServer;