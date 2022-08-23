import { Router } from "express";
import { createProject, deleteProjectById, updateProjectById, getProjectById, getProjects, getTasksByProject } from "../controllers/project.controller.js";
import { paramIdValidator, bodyProjectValidator } from "../middlewares/validatorAuth.js";
import { verifyToken } from "../middlewares/verifyUserToken.js";

const projectRouter = Router();

projectRouter.post("/", verifyToken, bodyProjectValidator, createProject);
projectRouter.get("/", verifyToken , getProjects);
projectRouter.get("/:idProject", verifyToken, paramIdValidator, getProjectById);
projectRouter.get("/tasks/:idProject", verifyToken, paramIdValidator, getTasksByProject);
projectRouter.patch("/:idProject", verifyToken, paramIdValidator, bodyProjectValidator, updateProjectById);
projectRouter.delete("/:idProject", verifyToken, paramIdValidator, deleteProjectById);

export default projectRouter;