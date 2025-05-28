import express from 'express';
import { register, login } from '../controllers/auth.js';

// Router
const router = express.Router();

// Routes:
    // Get all users
    router.post('/register', register);  
    router.post('/login', login);
   
export default router;