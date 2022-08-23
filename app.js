import "dotenv/config";
import express from 'express';
import morgan from 'morgan';
import cors from "cors";

import routes from "./routes/index.route.js";
import cookieParser from "cookie-parser";

const whiteList = [process.env.ORIGIN1];
const app = express();

app.use(cors({
  origin: function(origin, callback){
    if(!origin || whiteList.includes(origin)){
      return callback(null, origin);
    }
    else{
      return callback(`Error de CORS ${origin} no autorizado`);
    }
  }
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1', routes);

export default app;