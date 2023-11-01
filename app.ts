import express, { Request, Response } from "express";
import todoRouter from "./routes/Todos";
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());

const uri = process.env.MONGO_URI;
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
}
run().catch(console.dir);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (error: any) => console.log(error));
db.once("open", () => console.log("DB Connected"));

app.use("/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});
