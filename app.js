import "dotenv/config";
import express from 'express';
import morgan from 'morgan';
import routes from "./routes/index.route.js";
import cookieParser from "cookie-parser";

import { createRoles } from './helpers/initialSetup.js';

const app = express();
createRoles(); //create default roles


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1', routes);

export default app;