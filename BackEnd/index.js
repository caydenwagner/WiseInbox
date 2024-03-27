// index.js
import express from 'express';
import fs from 'fs';
import https from 'https';
import 'dotenv/config';
import { initPassport } from './initPassport.js';
import routes from './routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const port = 3000;

// SSL options
const httpsOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
};

const server = https.createServer(httpsOptions, app);

// Initialize Passport
initPassport(app);

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use('/', routes);

// Error handling middleware
app.use(errorHandler);

// Start the server
server.listen(port, () => console.log(`Server listening at port ${port}`));