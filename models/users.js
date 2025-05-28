// user model
import mongoose from "mongoose";

const userSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
},
{
    timestamps: true
});

export const User = mongoose.model('User', userSchema);
