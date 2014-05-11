'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('blocksApp.controllers'));
  beforeEach(module('blocksApp.services'));

  describe('PlayCtrl', function(){
    var scope, ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('PlayCtrl', { $scope: scope });
    }));


    it('should create "question" model', function() {
      expect(scope.question).toBeDefined();
    });
  });

});
