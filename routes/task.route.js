import { Router } from "express";
import { getTasks, createTask, getTaskById, updateTaskById, deleteTaskById } from "../controllers/task.controller.js";
import { verifyToken } from "../middlewares/verifyUserToken.js";
import { bodyTaskValidator } from "../middlewares/validatorAuth.js";
import { paramIdValidator } from "../middlewares/validatorAuth.js";

const taskRouter = Router();

taskRouter.post("/", verifyToken, bodyTaskValidator, createTask);
taskRouter.get("/", verifyToken , getTasks);
taskRouter.get("/:idTask", verifyToken, paramIdValidator, getTaskById);
taskRouter.patch("/:idTask", verifyToken, paramIdValidator, bodyTaskValidator, updateTaskById);
taskRouter.delete("/:idTask", verifyToken, paramIdValidator, deleteTaskById);

export default taskRouter;






