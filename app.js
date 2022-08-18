import "dotenv/config";
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

/* app.use('/api/products', productsRoutes); */

export default app;