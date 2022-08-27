import "dotenv/config";
import express from 'express';
import morgan from 'morgan';
import cors from "cors";

import routes from "./routes/index.route.js";
import cookieParser from "cookie-parser";

//swagger
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerSpec } from "./helpers/initialSetup.js";

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];
const app = express();

/* Middlewares */
app.use(cors({
  origin: function(origin, callback){
    if(!origin || whiteList.includes(origin)){
      return callback(null, origin);
    }
    else{
      return callback(`Error de CORS ${origin} no autorizado`);
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use("/api/doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)));

/* Routes */
app.use('/api/v1', routes);

export default app;