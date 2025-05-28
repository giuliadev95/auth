import express from 'express';
import { register } from '../controllers/auth.js';

// Router
const router = express.Router();

// Routes:
    // Get all users
    router.post('/register', register);   
   
export default router;