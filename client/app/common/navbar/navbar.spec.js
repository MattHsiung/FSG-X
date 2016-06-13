import NavbarModule from './navbar'
import NavbarController from './navbar.controller';
import NavbarComponent from './navbar.component';
import NavbarTemplate from './navbar.html';
import _ from 'lodash';

describe('Navbar', () => {
  let $rootScope, makeController;

  beforeEach(window.module(NavbarModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new NavbarController();
    };
  }));

  describe('Module', () => {
    it('injects ui-router', () => {
      expect(NavbarModule.requires).to.include('ui.router');
    });
  });

  describe('Controller', () => {
    it('should have a logout method', () => {
      expect(makeController()).to.have.property('logout');
    });
    it('logout should be a function', () => {
      assert.isFunction(makeController().logout);
    });
  });

  describe('Template', () => {
    it('has user name in template', () => {
      expect(NavbarTemplate).to.match(/{{\s?vm\.user\.displayName\s?}}/g);
    });
  });

  describe('Component', () => {
      let component = NavbarComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(NavbarTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(NavbarController);
      });

      it('binds to user from APP component', () => {
        expect(component.bindings.user).to.equal('<');
      });
  });
});
