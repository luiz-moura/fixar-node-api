import { Router } from 'express';

import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import platformsRouter from '@modules/platforms/infra/http/routes/platforms.routes';
import instructorsRouter from '@modules/instructors/infra/http/routes/instructors.routes';
import CoursesRouter from '@modules/courses/infra/http/routes/courses.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/platforms', platformsRouter);
routes.use('/instructors', instructorsRouter);
routes.use('/courses', CoursesRouter);

export default routes;
