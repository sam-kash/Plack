import User from "../models/User"
import bcrypt from "bcryptjs"
import {generateToken} from "../utils/generateToken"
import { Request,Response } from "express"

export const registerUser = async (req:Request, res:Response) => {
    const {username , email, password} = req.body;

    const exist = await User.findOne({email});
    if(exist) return res.status(400).json({message:"user exists"})

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({username, email , password: hashed});

    res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id as any)
    });
};

export const loginUser = async(req:Request, res:Response) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "User not found"})

    const match = await bcypt.compare(password, user.password);
    if(!match) return res.status(400).json({message: "wrong password"})

    res.json({
        _id : user._id,
        email: user.email,
        token: generateToken(user._id as any)
    }) ;
};