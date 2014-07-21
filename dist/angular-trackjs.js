/*!
 * Angular TrackJs v0.0.2
 *
 * © 2014, Jamie Le Souef <jamielesouef@gmail.com>
 */

(function (angular) {

  'use strict';

  var angularTrackJs = angular.module('angular-trackjs', []);

  angularTrackJs.config(function ($provide) {

    $provide.decorator("$exceptionHandler", ["$delegate", "exceptionHandlerDecorator", function ($delegate, exceptionHandlerDecorator) {
      exceptionHandlerDecorator.decorate($delegate);
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


  angularTrackJs.provider('TrackJs', function () {
    this.configure = function (options) {
      if (options) {
        window.trackJs.configure(options);
      }
    };

    this.$get = angular.noop;
  });
})
(angular);
