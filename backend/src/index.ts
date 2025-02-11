import express from "express";
import cors from "cors"
import { todoRouter } from "./routes/todo";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/todos", todoRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})

