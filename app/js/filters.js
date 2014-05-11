'use strict';

/* Filters */

angular.module('blocksApp.filters', []).
  filter('elapsed', [function(version) {
    return function(time) {
      time = Math.floor(time / 1000);
      var h = Math.floor(time / 3600);
      var m = Math.floor(time / 60) % 60; 
      var s = time % 60;
      var a  = _.map([h, m, s], function(t) { return ('0' + t).slice(-2) });   
   
      return a.join(':');
    };
  }]);
