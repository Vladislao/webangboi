import landing from './templates/landing.html';

function config($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise("/");
	$stateProvider.state('landing', {
		url: '/',
		template: landing,
		controller: 'LandingCtrl',
		title: ''
	});
}

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', config];