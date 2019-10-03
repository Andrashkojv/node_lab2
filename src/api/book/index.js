import { Router } from 'express';
import bookControler from './controler.js'

const bookRouter = new Router();

//роути 
bookRouter.get('/', bookControler.get);
bookRouter.get('/:id', bookControler.get_id);
bookRouter.post('/', bookControler.post);
bookRouter.delete('/:id', bookControler.delete_id)

export default bookRouter;