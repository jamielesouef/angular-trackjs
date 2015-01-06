(function (angular) {

    'use strict';

    angular.module('trackJs', []);

    var configure = function (windowObj) {
        return function (options) {
            if (options && windowObj.trackJs) {
                windowObj.trackJs.configure(options);
            }
        };
    };

    angular.module('trackJs').config(function ($provide) {
        $provide.decorator("$exceptionHandler", function ($delegate, exceptionHandlerDecorator) {
            return exceptionHandlerDecorator.decorate($delegate);
        });
    });

    angular.module('trackJs').factory('exceptionHandlerDecorator', function ($window) {
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

    angular.module('trackJs').factory('trackJs', function ($window) {

        var ignoreErrorList = [];

        var track = function (message) {
            $window.trackJs.track(message);
        };

        var ignore = function (list) {
            if (angular.isArray(list)) {
                ignoreErrorList = ignoreErrorList.concat(list);
            } else {
                ignoreErrorList.push(list);
            }

            var onError = function (payload) {
                var validateError = function (errorCriteria) {
                    var matchedCriteria = [],
                        networkResponse = payload.network[0];

                    angular.forEach(errorCriteria, function (errorTest, responseProp) {
                        if (errorTest instanceof RegExp) {
                            matchedCriteria.push(errorTest.test(networkResponse[responseProp]));
                        } else {
                            matchedCriteria.push(networkResponse[responseProp] === errorTest);
                        }
                    });

                    return matchedCriteria.every(function (isTrue) {
                        return isTrue === true;
                    });

                };

                var hasError = function (error) {
                    return error === true;
                };

                var logError = ignoreErrorList
                    .map(validateError)
                    .some(hasError);

                return !logError;
            };

            this.configure({
                onError: onError
            });
        };

        return {
            track: track,
            ignore: ignore,
            configure: configure($window)
        };
    });

    angular.module('trackJs').provider('TrackJs', function () {
        this.configure = configure(window);
        this.$get = angular.noop;
    });

})
(angular);
