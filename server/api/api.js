import router			from 'express';
import UserRouter		from './users/user.router';
import MembersRouter	from './members/members.router';

const ApiRouter = router();

ApiRouter.use('/users',	UserRouter);
ApiRouter.use('/members', MembersRouter);

export default ApiRouter;