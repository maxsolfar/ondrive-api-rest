import { Router } from "express";

const taskRouter = Router();

taskRouter.post("/tasks", login);
taskRouter.get("/tasks", prueba);

export default taskRouter;