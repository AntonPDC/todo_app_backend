import mongoose, { Model, Schema } from "mongoose";

interface TodoSchema {
  text: string;
  completed: boolean;
}

const todoListSchema = new Schema<TodoSchema>({
  text: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

const Todos: Model<TodoSchema> = mongoose.model<TodoSchema>(
  "Todos",
  todoListSchema
);

export default Todos;
