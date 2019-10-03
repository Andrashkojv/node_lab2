import { Router } from 'express';
import bookControler from './controler.js'

const bookRouter = new Router();

bookRouter.get('/', bookControler.get);

export default bookRouter;