
import { User } from "../models/users.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwt_secret = 'jd7vrhg639s';

export const login = async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if( !user ) {
        return res.status(404).json({
            status: 'Error',
            message: 'User not found, unable to login.'
        })
    }
    if ( await bcrypt.compare(password, user.password)) {
        const token = jwt.sign (
            {
                id: user._id,
                name: user.name
            }, jwt_secret
        )
        return res.json({
            status: 'User logged in.',
            data: token
        });
    }

    res.status(401).json({
        status: 'Error',
        message: 'Name or password are not correct, unable to login.'
    })

    try{
        await   
        res.send(201).json({
            status: 'Successfully logged in.',
            message: 'User successfully logged in.',
            user: user
        })
    }
    catch (error) {
        res.status(501).json({
            status: 'Error',
            message: 'Error with the login process.'
        })
    }
}

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




