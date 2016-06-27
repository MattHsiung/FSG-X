import express		from 'express';
import ApiRouter	from './api/api';
import AuthRouter   from './auth/auth.router';
import config		from './config/config';
import middleware	from './middleware/middleware';

const app = express();

// if (config.seed) require('./util/seed');

app.use(express.static('dist'));

middleware(app);

app.use('/api',	ApiRouter);
app.use('/auth', AuthRouter);

//-------Errors--------
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

export default app;