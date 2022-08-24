import { Router } from "express";
import { getTasks, createTask, getTaskById, updateTaskById, deleteTaskById } from "../controllers/task.controller.js";
import { verifyToken } from "../middlewares/verifyUserToken.js";
import { bodyTaskValidator } from "../middlewares/validatorAuth.js";
import { paramIdValidatorTask } from "../middlewares/validatorAuth.js";

const taskRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: Task's Title
 *        description:
 *          type: string
 *          description: Task's Description
 *        color:
 *          type: string
 *          description: Task's Color #Hex
 *        tags:
 *          type: array
 *          description: Task's tags
 *        priority:
 *          type: string
 *          description: Task's Priority 
 *        expiryDate:
 *          type: date
 *          description: Task's Expiry Date
 *        projectId:
 *          type: string
 *          description: Task's Project ID
 *      required:
 *        - title
 *        - description
 *        - tags
 *        - priority
 *        - expiryDate
 *        - projectId
 *      example:
 *        title: Task 1
 *        description: The best task ever!
 *        color: "#f2e233"
 *        tags: ["work", "home"]
 *        priority: "Normal"
 *        expiryDate: "2022-10-22"
 *        projectId: "630320cf1089db06e7c0d4db"
 *  securitySchemes:
 *    bearerAuth: 
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
 
/**
 * @swagger
 * /api/v1/tasks:
 *  post:
 *    security: [
 *      {
 *        bearerAuth: []
 *      }
 *    ] 
 *    summary: Create a new Task
 *    tags: [Post Task]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: New Task created!    
 */

taskRouter.post("/", verifyToken, bodyTaskValidator, createTask);
/**
 * @swagger
 * /api/v1/tasks:
 *  get:
 *    security:
 *      -  bearerAuth: []
 *    summary: Return all Tasks for User
 *    tags: [Get All Tasks]
 *    responses:
 *      200:
 *        description: All Tasks for users!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Task'  
 */
taskRouter.get("/", verifyToken , getTasks);

/**
 * @swagger
 * /api/v1/tasks/{idTask}:
 *  get:
 *    security:
 *      -  bearerAuth: []
 *    summary: Return Task by ID
 *    tags: [Get Task by ID] 
 *    parameters:
 *      - in: path
 *        name: idTask
 *        schema:
 *          type: string
 *        required: true
 *        description: the task id  
 *    responses:
 *      200:
 *        description: Task by ID!    
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Task'
 */
taskRouter.get("/:idTask", verifyToken, paramIdValidatorTask, getTaskById);

/**
 * @swagger
 * /api/v1/tasks/{idTask}:
 *  patch:
 *    security:
 *      -  bearerAuth: []
 *    summary: Update a Task
 *    tags: [Update Task]
 *    parameters:
 *      - in: path
 *        name: idTask
 *        schema:
 *          type: string
 *        required: true
 *        description: the task id 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Task' 
 *    responses:
 *      200:
 *        description: Update Task!    
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Task'
 */
taskRouter.patch("/:idTask", verifyToken, paramIdValidatorTask, bodyTaskValidator, updateTaskById);

/**
 * @swagger
 * /api/v1/tasks/{idTask}:
 *  delete:
 *    security:
 *      -  bearerAuth: []
 *    summary: Delete a Task
 *    tags: [Delete Task]
 *    parameters:
 *      - in: path
 *        name: idTask
 *        schema:
 *          type: string
 *        required: true
 *        description: the task id 
 *    responses:
 *      200:
 *        description: Delete Task!    
 */
taskRouter.delete("/:idTask", verifyToken, paramIdValidatorTask, deleteTaskById);

export default taskRouter;


