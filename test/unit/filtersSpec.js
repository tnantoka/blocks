'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
  beforeEach(module('blocksApp.filters'));


  describe('elapsed', function() {
    it('should format time', inject(function(elapsedFilter) {
      expect(elapsedFilter(4210000)).toEqual('01:10:10');
    }));
  });
});
