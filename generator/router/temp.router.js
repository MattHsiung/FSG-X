import router			from 'express';
import * as controller	from './<%= name %>.controller';

const <%= upCaseName %>Router = router();

<%= upCaseName %>Router.param('id', controller.params);

<%= upCaseName %>Router.route('/')
  .get(controller.get)
  .post(controller.post);

<%= upCaseName %>Router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.del);

export default <%= upCaseName %>Router;