import path			from 'path';
import express		from 'express';
import ApiRouter	from './api/api';
import AuthRouter   from './auth/auth.router';
import config		from './config/config';
import middleware	from './middleware/middleware';
import seedDB		from './util/seed';

const app = express();

if (config.seed) seedDB();

app.use(express.static('dist'));

middleware(app);

app.use('/api',	ApiRouter);
app.use('/auth', AuthRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});


//-------Errors--------
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

export default app;