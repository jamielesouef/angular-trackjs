(function (angular) {

  'use strict';

  var angularTrackJs = angular.module('trackJs', []);

  var tryThrowNoTrackJSError = function () {
    if (!window.trackJs) {
      throw new Error('TrackJS not available');
    }
  };

  var configureTrackJs = function (options) {
    tryThrowNoTrackJSError();
    window.trackJs.configure(options || {});
  };

  var trackException = function (exception) {
    tryThrowNoTrackJSError();
    window.trackJs.track(exception || '');
  };

  var decorateExceptionHandler = function ($delegate, exceptionHandlerDecorator) {
    exceptionHandlerDecorator.decorate($delegate);
  };

  angularTrackJs.config(function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", "exceptionHandlerDecorator", decorateExceptionHandler]);
  });

  angularTrackJs.factory('exceptionHandlerDecorator', function () {
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
