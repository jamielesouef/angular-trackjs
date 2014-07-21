"use strict";

ddescribe('Factory: exceptionHandlerDecorator', function () {

  beforeEach(module('trackJs'));

  var $window, trackJs, $rootScope;

  beforeEach(inject(function (_$rootScope_, _$window_, _trackJs_) {
    $rootScope = _$rootScope_;
    $window = _$window_;
    trackJs = _trackJs_;

    $window.trackJs = {
      track : function (message) {}
    }

    spyOn($window.trackJs, 'track');
  }));

  describe('when tracking a custom error', function (){
    beforeEach(function() {
      trackJs.track('my track message');
      $rootScope.$apply();
    });

    it('should call trackJs on the $window object', function() {
      expect($window.trackJs.track).toHaveBeenCalledWith('my track message');
    })

  })
});
