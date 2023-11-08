import express, { Application, Request, Response } from "express";
import mongoose, { Connection } from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import todoRouter from "./routes/Todos";

dotenv.config();
const app: Application = express();
const port: number = parseInt(process.env.PORT || "8000", 10);
const uri: string = process.env.MONGO_URI!;

if (!uri) {
  console.error(
    "MONGO_URI environment variable is not defined. Please set it in your .env file."
  );
  process.exit(1);
}
async function connectToMongoDB() {
  const client: MongoClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();

mongoose.connect(uri);

const db: Connection = mongoose.connection;
db.on("error", (error: any) => {
  console.error("Mongoose connection error:", error);
});

app.use(express.json());

app.use("/todos", todoRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
