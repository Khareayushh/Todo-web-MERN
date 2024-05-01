import { Request, Response } from "express";
import { User, Todos } from "../modal/todoModal"

export const getAllTodos = async (req: Request, res: Response) => {
    const userId = req.headers["userId"]; //not having this will be handled by authenticate middleware.
    // console.log("getAll", userId);
    try {
        const userTodos = await Todos.find({ userId });
        res.status(200).json(userTodos);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const saveTodo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const done = false;
    const userId = req.headers["userId"];
    if (!title || !description) {
        res.status(400).json({ message: "All fields are neccesary" });
    }
    try {
        const findTodo = await Todos.findOne({ title, description });
        if (findTodo) {
            res.status(400).json({ message: "Same todo can't be there." });
            return;
        }
        const newTodo = new Todos({ title, description, done, userId });
        await newTodo.save();
        res.status(200).json(newTodo);
    } catch (error) {
        res.status(400).json({ error: "Failed to save todo" });
    }
}