import router			from 'express';
import * as controller	from './members.controller';
import {verifyUser}		from '../../auth/auth-util'

const MembersRouter = router();

MembersRouter.route('/secret-stash')
  .get(verifyUser, controller.getStash);

export default MembersRouter;