import express from 'express';
import apiRouter from './api';

const app = express();

//додаткові методи для обробки запитів POST і PUT 
app.use(express.json());
app.use(express.urlencoded());
//роутер http://localhost:3000/api/ 
app.use('/api', apiRouter);

app.listen(3000);