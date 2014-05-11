'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('blcok app', function() {

  browser.get('index.html');

  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/home");
  });


  describe('home', function() {

    beforeEach(function() {
      browser.get('index.html#/home');
    });

    it('should render home when user navigates to home', function() {
      expect($('p.lead').getText()).toMatch(/v0.1.0/);
    });

  });


  describe('home', function() {

    beforeEach(function() {
      browser.get('index.html#/play');
    });


    it('should render play when user navigates to /play', function() {
      expect($('.input-group .btn').getText()).toMatch(/returnType/);
    });

  });
});
