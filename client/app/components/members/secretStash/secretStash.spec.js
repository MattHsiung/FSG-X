import SecretStashModule from './secretStash'
import SecretStashController from './secretStash.controller';
import SecretStashComponent from './secretStash.component';
import SecretStashTemplate from './secretStash.html';

describe('SecretStash', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SecretStashModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SecretStashController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    it('has the secret-stash in template', () => {
      expect(SecretStashTemplate).to.match(/{{\s?vm\.stash\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SecretStashComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SecretStashTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SecretStashController);
      });
  });
});
