import { User } from "../models/users.js";
import bcrypt from 'bcryptjs';


// Register new user
export const register = async (req, res) => {
     const { name, password } = req.body;

    if(!name) {
       return res.json({status:'Error', message: 'The name is missing.'});
    }
    if(!password) {
        return res.json({status:'Error', message: 'The password is missing.'});
    }
    if(password.length < 5) {
        return res.json({status: 'Error', message: 'Password is too short.'});
    }
    // implement password hashing via bcrypt
    const passwordHashed = await bcrypt.hash(password,10);

    // use the User mongoose model to channel the posted json object into the local Mongo datatabse
    const user = new User({ name: name, password: passwordHashed});
    
    // post and save the new user into the local Mongo datatabse
    try{
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(501).json({
            status: 'Error',
            message: error.message
        })
    }
}




