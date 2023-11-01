import express, { Request, Response } from "express";
import todoRouter from "./routes/Todos";
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(express.json());

const uri =
  "mongodb+srv://antonpdecesare:admin@todoapp.uuygnx8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);

app.use("/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});
