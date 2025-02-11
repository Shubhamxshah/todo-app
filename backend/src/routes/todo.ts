import {Request, Response} from "express"
import { Router } from "express"
import { TODO } from "../types/db"

export const todoRouter = Router();
let todos: TODO[] = [];

todoRouter.get("/", (_, res: Response) => {
  res.status(200).json(todos)
})

todoRouter.post("/", (req: Request, res: Response) => {
  const {name, completed} = req.body;

  if (typeof name !== "string" || typeof completed !== "boolean") {
    res.status(400).json({message: "invalid name: must be of type string"})
    return;
  }

  const random = Math.random();
  todos.push({id: random, name: name, completed: completed})
  res.status(200).json(todos);
})

todoRouter.put("/", (req: Request, res: Response) => {
  const {id, name, completed} = req.body;
  
  if (typeof name !== "string" || typeof completed !== "boolean") {
    res.status(400).json({message: "invalid name: must be of type string"})
    return;
  }

  todos = todos.map(todo => 
    todo.id === id ? { ...todo, name, completed } : todo
  );
  res.status(200).json(todos);
})

todoRouter.delete("/", (req: Request, res: Response) => {
  const {id} = req.body;
  if (!id) {
    res.status(400).json({message: "invalid name: must be of type string"})
    return;
  }

  todos = todos.filter(todo => todo.id !== id);
  res.status(200).json(todos)
})

