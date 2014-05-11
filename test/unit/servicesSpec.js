'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('blocksApp.services'));


  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1.0');
    }));
  });

  describe('Question', function() {
    it('should return question constructor', inject(function(Question) {
      var question = new Question();
      expect(_.values(Question.contexts)).toContain(question.context);
    }));
  });

});
