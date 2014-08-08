"use strict";

describe('Factory: exceptionHandlerDecorator', function () {

  beforeEach(module('trackJs'));

  var $window, trackJs;

  beforeEach(inject(function (_$window_, _trackJs_) {
    $window = _$window_;
    trackJs = _trackJs_;

    $window.trackJs = {
      track : function (message) {},
      configure: function(config) {}
    };

    spyOn($window.trackJs, 'track');
    spyOn($window.trackJs, 'configure');
  }));

  describe('when tracking a custom error', function (){
    beforeEach(function() {
      trackJs.configure({sessionId: 2341234});
      trackJs.track('my track message');
    });

    it('should call trackJs on the $window object', function() {
      expect($window.trackJs.track).toHaveBeenCalledWith('my track message');
    });

    it('should have called the configuration method on the window object', function() {
      expect($window.trackJs.configure).toHaveBeenCalledWith({sessionId: 2341234});
    });

  })
});
