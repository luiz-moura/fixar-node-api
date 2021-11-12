import { Router } from 'express';
import categoriesRouter from './categories.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/users', usersRouter);

export default routes;
