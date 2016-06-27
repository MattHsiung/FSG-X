import morgan		from 'morgan';
import bodyParser	from 'body-parser';
import cors			from 'cors';
import logger		from '../util/logger';

const middleware = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(logger);
  app.use(cors());
};

export default middleware;