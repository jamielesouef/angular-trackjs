(function (angular) {

  'use strict';

  var angularTrackJs = angular.module('trackJs', []);

  angularTrackJs.config(function ($provide) {

    $provide.decorator("$exceptionHandler", ["$delegate", "exceptionHandlerDecorator", function ($delegate, exceptionHandlerDecorator) {
      return exceptionHandlerDecorator.decorate($delegate);
    }]);

  });

  angularTrackJs.factory('exceptionHandlerDecorator', function ($window) {
    var decorate = function ($delegate) {
      return function (exception, cause) {
        trackException(exception);

        $delegate(exception, cause);
      };
    };

    return {
      decorate: decorate
    };
  });

  var trackException = function(exception) {
    if (window.trackJs) {
      window.trackJs.track(exception || '');
    }
  };

  var configureTrackJs = function (options) {
    if (window) {
      window.trackJs.configure(options || {});
    }
  };

  angularTrackJs.factory('trackJs', function () {
    return {
      track: trackException,
      configure: configureTrackJs
    };
  });


  angularTrackJs.provider('TrackJs', function () {
    this.configure = configureTrackJs;
    this.$get = angular.noop;
  });
})
(angular);
