import { Router } from 'express';

import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import platformsRouter from '@modules/platforms/infra/http/routes/platforms.routes';
import instructorsRouter from '@modules/instructors/infra/http/routes/instructors.routes';
import coursesRouter from '@modules/courses/infra/http/routes/courses.routes';
import ratingsRouter from '@modules/ratings/infra/http/routes/ratings.routes';
import coursesPendingRouter from '@modules/courses/infra/http/routes/coursesPending.routes';
import supportsRouter from '@modules/supports/infra/http/routes/supports.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/platforms', platformsRouter);
routes.use('/instructors', instructorsRouter);
routes.use('/courses', coursesRouter);
routes.use('/ratings', ratingsRouter);
routes.use('/courses-pending', coursesPendingRouter);
routes.use('/supports', supportsRouter);

export default routes;
