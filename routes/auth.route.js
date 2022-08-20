import { Router } from "express";
import { login, logout, prueba, refreshToken, register } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyUserToken.js";
import { verifyRefreshToken } from "../middlewares/verifyRefreshToken.js";
import { loginValidator, registerValidator } from "../middlewares/validatorAuth.js";
const authRouter = Router();

authRouter.post("/login", loginValidator, login);

authRouter.post("/register", registerValidator, register);

authRouter.get("/prueba", verifyToken ,prueba);
authRouter.get("/refresh-token", verifyRefreshToken, refreshToken);
authRouter.get("/logout", logout);

export default authRouter;
