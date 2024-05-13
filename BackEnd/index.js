// index.js
import express from 'express';
import 'dotenv/config';
import { initPassport } from './initPassport.js';
import routes from './routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const port = 3000;

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
app.listen(port, () => console.log(`Server listening at port ${port}`));