import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

export const User = mongoose.model("User", userSchema);
export const Todos = mongoose.model("Todos", todoSchema);

