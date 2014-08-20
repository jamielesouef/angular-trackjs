/*!
 * Angular TrackJs v0.0.6
 *
 * © 2014, Jamie Le Souef <jamielesouef@gmail.com>
 */

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

  angularTrackJs.config(function ($provide) {

    $provide.decorator("$exceptionHandler", ["$delegate", "exceptionHandlerDecorator", function ($delegate, exceptionHandlerDecorator) {
      return exceptionHandlerDecorator.decorate($delegate);
    }]);

  });

  angularTrackJs.factory('exceptionHandlerDecorator', function ($window) {
    var decorate = function ($delegate) {
      return function (exception, cause) {
        if ($window.trackJs) {
          $window.trackJs.track(exception);
        }

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
