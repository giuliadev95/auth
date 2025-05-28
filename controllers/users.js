import { User } from "../models/users.js";

 // get all users
export const get_all_users = async (req, res) => {
try {
    const users = await User.find();
    res.status(200).json(users);
}
catch(error){
    res.status(200).json({message: error.message})
}
} 

// get a user by id
export const get_user_by_id = async (req, res) => {
    const { id } = req.params;
        try {
            const searched_user  = await User.findById(id);
            res.status(200).json(searched_user)
        }
        catch(error){
            res.status(404).json({
                message: error.message
            })
        }
    }

// post a user
export const post_user = async (req, res) => {
    const user = req.body;
    const new_user = new User(user);
    try {
        await new_user.save();
        res.status(201).json(new_user);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}

// update a user
export const update_user = async (req, res) => {
    const {id} = req.params
    const {name, password} = req.body
    try {
        const updated_user = await User.findByIdAndUpdate(
            id,
            { $set: { name, password } },
            { new: true }
        );
        if (!updated_user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(updated_user);
    } 
    catch(error){
        res.status(501).json({message: error.message});
    }
}
    
// delete a user
export const delete_user = async (req, res) => {
    const {id} = req.params;
    try {
            const searched_user  = await User.findById(id);
            await searched_user.deleteOne({ id: id});
            res.status(200).json({
                message: "User deleted successfully."
            })
    }
    catch(error){
        res.status(404).json({
            message: error.message
        })
    }
}


