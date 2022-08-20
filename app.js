import "dotenv/config";
import express from 'express';
import morgan from 'morgan';
import routes from "./routes/index.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1', routes);

export default app;