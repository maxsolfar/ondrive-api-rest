import { Router } from "express";
import { createProject, deleteProjectById, updateProjectById, getProjectById, getProjects, getTasksByProject } from "../controllers/project.controller.js";
import { paramIdValidator, bodyProjectValidator } from "../middlewares/validatorAuth.js";
import { verifyToken } from "../middlewares/verifyUserToken.js";

const projectRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Project:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: Project's Title
 *        description:
 *          type: string
 *          description: Project's Description
 *        color:
 *          type: string
 *          description: Project's Color #Hex
 *        iconProject:
 *          type: string
 *          description: Project's icon Url
 *      required:
 *        - title
 *        - description
 *      example:
 *        title: Project 1
 *        description: The best project ever!
 *        color: "#f2e233"
 *        iconProject: https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Noun_Project_projects_icon_1327109_cc.svg/1024px-Noun_Project_projects_icon_1327109_cc.svg.png
 *  securitySchemes:
 *    bearerAuth: 
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/projects:
 *  post:
 *    security: [
 *      {
 *        bearerAuth: []
 *      }
 *    ] 
 *    summary: Create a new Project
 *    tags: [Post Project]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Project'
 *    responses:
 *      200:
 *        description: New Project created!    
 */
projectRouter.post("/", verifyToken, bodyProjectValidator, createProject);

/**
 * @swagger
 * /api/v1/projects:
 *  get:
 *    security:
 *      -  bearerAuth: []
 *    summary: Return all Projects for User
 *    tags: [Get All Projects]
 *    responses:
 *      200:
 *        description: All Projects for user!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Project'  
 */
projectRouter.get("/", verifyToken , getProjects);

/**
 * @swagger
 * /api/v1/projects/{idProject}:
 *  get: 
 *    security:
 *      -  bearerAuth: []
 *    summary: Return Project by ID
 *    tags: [Get Project by ID] 
 *    parameters:
 *      - in: path
 *        name: idProject
 *        schema:
 *          type: string
 *        required: true
 *        description: the project id  
 *    responses:
 *      200:
 *        description: Project by ID!    
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: 
 *                $ref: '#/components/schemas/Project'
 *      404:
 *        description: Project not found
 *      403:
 *        description: Incorrect ID Format 
 */
projectRouter.get("/:idProject", verifyToken, paramIdValidator, getProjectById);

/**
 * @swagger
 * /api/v1/projects/tasks/{idProject}:
 *  get:
 *    security:
 *      -  bearerAuth: []
 *    summary: Return Tasks for Project
 *    tags: [Get Task by Project] 
 *    parameters:
 *      - in: path
 *        name: idProject
 *        schema:
 *          type: string
 *        required: true
 *        description: the project id  
 *    responses:
 *      200:
 *        description: Tasks by Project!    
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Project'
 */
projectRouter.get("/tasks/:idProject", verifyToken, paramIdValidator, getTasksByProject);

/**
 * @swagger
 * /api/v1/projects/{idProject}:
 *  patch:
 *    security:
 *      -  bearerAuth: []
 *    summary: Update a Project
 *    tags: [Update Project] 
 *    parameters:
 *      - in: path
 *        name: idProject
 *        schema:
 *          type: string
 *        required: true
 *        description: the project id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Project' 
 *    responses:
 *      200:
 *        description: Update Project!    
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Project'
 */
projectRouter.patch("/:idProject", verifyToken, paramIdValidator, bodyProjectValidator, updateProjectById);

/**
 * @swagger
 * /api/v1/projects/{idProject}:
 *  delete:
 *    security:
 *      -  bearerAuth: []
 *    summary: Delete a Project
 *    tags: [Delete Project]
 *    parameters:
 *      - in: path
 *        name: idProject
 *        schema:
 *          type: string
 *        required: true
 *        description: the project id   
 *    responses:
 *      200:
 *        description: Delete Project!    
 */
projectRouter.delete("/:idProject", verifyToken, paramIdValidator, deleteProjectById);

export default projectRouter;