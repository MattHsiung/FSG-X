import angular from 'angular';
import uiRouter from 'angular-ui-router';
import './members.sass';
import secretStash from './secretStash/secretStash'

let membersModule = angular.module('members', [
  uiRouter,
  secretStash.name
])

.config(($stateProvider) => {
	"ngInject";
    $stateProvider
    	.state('members', {
        	url: '/members-area',
        	template: `
        	<div class="members">
                <Secret-Stash>
        	</div>`,
	        requireAuth: true
    	});
});

export default membersModule;

