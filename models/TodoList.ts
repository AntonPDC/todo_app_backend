import mongoose, { Model, Schema } from "mongoose";

interface TodoSchema {
  id: number;
  text: string;
  completed: boolean;
}

const todoListSchema = new Schema<TodoSchema>({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

const Todos: Model<TodoSchema> = mongoose.model<TodoSchema>(
  "Todos",
  todoListSchema
);

export default Todos;
