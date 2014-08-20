"use strict";

describe('Factory: exceptionHandlerDecorator', function () {

  beforeEach(module('trackJs'));

  var trackJs;

  beforeEach(inject(function (_trackJs_) {
    trackJs = _trackJs_;

    window.trackJs = jasmine.createSpyObj('trackJs', ['track', 'configure']);;

  }));

  describe('when tracking a custom error and trackjs is available', function (){
    beforeEach(function() {
      trackJs.configure({sessionId: 2341234});
      trackJs.track('my track message');
    });

    it('should call trackJs on the window object', function() {
      expect(window.trackJs.track).toHaveBeenCalledWith('my track message');
    });

    it('should have called the configuration method on the window object', function() {
      expect(window.trackJs.configure).toHaveBeenCalledWith({sessionId: 2341234});
    });

  });

  describe('when passing nothing to track or configure', function (){
    beforeEach(function() {
      trackJs.configure();
      trackJs.track();
    });

    it('should call trackJs on the window object', function() {
      expect(window.trackJs.track).toHaveBeenCalledWith(jasmine.any(String));
    });

    it('should have called the configuration method on the window object', function() {
      expect(window.trackJs.configure).toHaveBeenCalledWith(jasmine.any(Object));
    });

  });
});
