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
    res.status(500).send("Error saving todo");
  }
});

todoRouter.get("/get-todos", async (req: Request, res: Response) => {
  try {
    const allTodos = await Todos.find();
    res.status(200).json(allTodos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not retrieve todos");
  }
});

todoRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todos.findById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not retrieve todos");
  }
});

todoRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await Todos.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).send("Todo not found");
    }

    res.status(200).json("Todo deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export default todoRouter;
