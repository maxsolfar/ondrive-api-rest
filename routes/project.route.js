import { Router } from "express";
import { createProject, getProjects } from "../controllers/project.controller.js";
import { verifyToken } from "../middlewares/verifyUserToken.js";

const projectRouter = Router();

projectRouter.post("/", verifyToken, createProject);
projectRouter.get("/", verifyToken , getProjects);
/* projectRouter.get("/:idProject", prueba);
projectRouter.patch("/:idProject", prueba);
projectRouter.delete("/:idProject", prueba); */

export default projectRouter;