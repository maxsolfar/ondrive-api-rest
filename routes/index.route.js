import { Router } from "express";
import authRouter from "./auth.route.js";
import projectRouter from "./project.route.js";
import taskRouter from "./task.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/projects", projectRouter);
router.use("/tasks", taskRouter);

export default router;