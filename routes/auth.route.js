import { Router } from "express";
import { login, logout, refreshToken, register } from "../controllers/auth.controller.js";
import { verifyRefreshToken } from "../middlewares/verifyRefreshToken.js";
import { loginValidator, registerValidator } from "../middlewares/validatorAuth.js";
const authRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Register:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: Auth's Email
 *        password:
 *          type: string
 *          description: Auth's Password
 *        confirmPassword:
 *          type: string
 *          description: Auth's Confirm Password
 *        name:
 *          type: string
 *          description: Auth's Name
 *        lastName:
 *          type: string
 *          description: Auth's Last Name
 *      required:
 *        - email
 *        - password
 *        - name
 *        - lastName
 *      example:
 *        email: super@gmail.com
 *        password: "12345678"
 *        confirmPassword: "123456"
 *        name: "Super"
 *        lastName: "Super"
 *    Login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: Auth's Email
 *        password:
 *          type: string
 *          description: Auth's Password
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: prueba2@gmail.com
 *        password: "12345678"
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: Login
 *    tags: [Login]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: Login Success!    
 */
authRouter.post("/login", loginValidator, login);

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    summary: Register
 *    tags: [Register]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Register'
 *    responses:
 *      200:
 *        description: Register Success!    
 */
authRouter.post("/register", registerValidator, register);

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *  get:
 *    summary: Return a Refresh Token
 *    tags: [Refresh Token] 
 *    responses:
 *      200:
 *        description: Refresh Token!    
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: 
 *                $ref: '#/components/schemas/Login'
 */
authRouter.get("/refresh-token", verifyRefreshToken, refreshToken);
authRouter.get("/logout", logout);

export default authRouter;
