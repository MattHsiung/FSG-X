import router			from 'express';
import * as controller	from './user.controller';
import {verifyUser}		from '../../auth/auth-util';

const UserRouter = router();

UserRouter.param('id', controller.params);

UserRouter.route('/me')
	.get(verifyUser, controller.getOne)
	.put(verifyUser, controller.put);

UserRouter.route('/')
  .get(controller.get);

UserRouter.route('/:id')
  .get(controller.getOne)
  .put(verifyUser, controller.put)
  .delete(verifyUser, controller.del);

export default UserRouter;