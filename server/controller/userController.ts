import { Request, Response } from "express";
import { SECRET } from "../middleware/authentication";
import { User, Todos } from "../modal/todoModal";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "all fields are neccesary" });
    }
    try {
        const user = await User.findOne({ username });
        if (user) {
            res.status(200).json({ message: "user is already registered, try Login" });
            return;
        }
        const newUser = new User({username, password});
        await newUser.save();
        const token = jwt.sign({id: newUser._id}, SECRET, {expiresIn: '1h'});
        res.json({ message: 'User created successfully', token });
    } catch (error) {
        console.error("Error", error);
    }

}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
}