import express from 'express';
import {delete_user, get_all_users, get_user_by_id, post_user, update_user} from "../controllers/users.js";

// Router
const router = express.Router();

// Routes:
    // Get all users
    router.get('/', get_all_users);   
    // Get a user
    router.get('/:id', get_user_by_id);
    // Add a user
    router.post('/', post_user);
    // Delete a user
    router.delete('/:id', delete_user);
    // Update a user
    router.patch('/:id', update_user);
    
export default router;
