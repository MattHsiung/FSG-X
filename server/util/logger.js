const chalk = require('chalk');
const util = require('util');

const logMiddleware = (req, res, next) => {
	var {path, query, body, method} = req;
	
	if(req.header('Authorization')){
		var token = req.header('Authorization').slice(7).split('.');
	}

  util.log(('---NEW REQUEST---'));

  console.log(util.format(chalk.green('%s: %s %s'), 'REQUEST ', method, path));
  console.log(util.format(chalk.yellow('%s: %s'), 		'QUERY   ', util.inspect(query)));
  console.log(util.format(chalk.cyan('%s: %s'), 			'BODY    ', util.inspect(body)));
  console.log(util.format(chalk.red('%s: %s'), 			'AUTH    ', util.inspect(token)));
  next();
};

export default logMiddleware;