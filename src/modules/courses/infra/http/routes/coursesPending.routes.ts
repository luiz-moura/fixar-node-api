import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CoursesPendingController from '../controllers/CoursesPendingController';

const coursesPendingRouter = Router();
const coursesPendingController = new CoursesPendingController();

coursesPendingRouter.use(ensureAuthenticated);

coursesPendingRouter.get('/', coursesPendingController.index);
coursesPendingRouter.get('/show/:course_id', coursesPendingController.show);

export default coursesPendingRouter;
