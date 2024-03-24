import express, { Request, Response } from "express";
import { authenticate } from "../middleware/authentication";
import { Todos } from "../modal/todoModal";
import { getAllTodos, saveTodo } from "../controller/todoController";

const router = express.Router();

router.get("/todos", authenticate , getAllTodos)

router.post("/todos", authenticate, saveTodo);


export default router;