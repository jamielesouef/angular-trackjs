(function(angular) {

    'use strict';

    var seekTrackJS = angular.module('angular-trackjs', []);

    seekTrackJS.config(function($provide) {

        $provide.decorator("$exceptionHandler", ["$delegate", "exceptionHandlerDecorator", function ($delegate, exceptionHandlerDecorator) {
            exceptionHandlerDecorator.decorate($delegate);
        }]);

    });

    seekTrackJS.factory('skTrackJSOptions', function () {

        var setTrackJSOption = function(option) {
            console.log(option);
        };

        return {
            set: setTrackJSOption
        }
    });

    seekTrackJS.factory('exceptionHandlerDecorator', function ($window) {
        var decorate = function ($delegate) {
            return function (exception, cause) {
                if ($window.trackJs) {
                    $window.trackJs.track(exception);
                }

                $delegate(exception, cause);
            };
        };

        return {
            decorate : decorate
        };
    });
})(angular);
