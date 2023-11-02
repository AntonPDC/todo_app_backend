import express, { Request, Response } from "express";
import Todos from "../models/TodoList";

const todoRouter = express.Router();

todoRouter.post("/create-todo", async (req: Request, res: Response) => {
  try {
    const newTodo = new Todos({
      text: req.body.text,
      completed: req.body.completed,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).send("Error saving todo");
  }
});

todoRouter.get("/get-todos", async (req: Request, res: Response) => {
  try {
    const allTodos = await Todos.find();
    res.status(200).json(allTodos);
  } catch (error) {
    res.status(500).send("Could not retrieve todos");
  }
});

export default todoRouter;
