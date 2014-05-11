'use strict';

/* Directives */


angular.module('blocksApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('pathClass', ['$location', function($location) {
    return function(scope, elm, attrs) {
      var path = $location.path().slice(1);
      attrs.$addClass(path);
    };
  }]).
  directive('autoFocus', [function() { 
    return function(scope, elm, attrs) { 
      elm[0].focus(); 
    };
  }]);
