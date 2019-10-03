import { Router } from 'express';
import bookRouter from'./book';

const apiRouter = new Router();
//роутер ./book
apiRouter.use('/book', bookRouter);

export default apiRouter;