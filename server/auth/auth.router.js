import router			from 'express';
import * as controller	from './auth.controller';
import * as oauth 		from './oauth.controller';
import {verifyUser}		from './auth-util';

const AuthRouter = router();

AuthRouter.post('/login', controller.login);
AuthRouter.post('/signup', controller.signup);
AuthRouter.post('/unlink', verifyUser, controller.unlink)

oauth.providers.forEach((provider) => {
	AuthRouter.post(`/${provider}`, oauth[provider]);
});

export default AuthRouter;