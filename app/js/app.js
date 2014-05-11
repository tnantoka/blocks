'use strict';


// Declare app level module which depends on filters, and services
angular.module('blocksApp', [
  'ngRoute',
  'ngAnimate',
  'blocksApp.filters',
  'blocksApp.services',
  'blocksApp.directives',
  'blocksApp.controllers',
  'ui.ace',
  'hljs'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', { templateUrl: 'partials/home.html', controller: 'HomeCtrl' });
  $routeProvider.when('/play', { templateUrl: 'partials/play.html', controller: 'PlayCtrl' });
  $routeProvider.otherwise({ redirectTo: '/home' });
}]);
