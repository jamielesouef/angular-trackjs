/*!
 * Angular TrackJs v0.1.1
 *
 * © 2016, Jamie Le Souef <jamielesouef@gmail.com> and Boris Kvid <bkvid@seek.com.au>/SEEK Ltd.
 */

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

    angular.module('trackJs').config(["$provide", function ($provide) {
        $provide.decorator("$exceptionHandler", ["$delegate", "exceptionHandlerDecorator", function ($delegate, exceptionHandlerDecorator) {
            return exceptionHandlerDecorator.decorate($delegate);
        }]);
    }]);

    angular.module('trackJs').factory('exceptionHandlerDecorator', ["$window", function ($window) {
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
    }]);

    angular.module('trackJs').factory('trackJs', ["$window", function ($window) {
        var ignoreRules = [];

        var track = function (message) {
            $window.trackJs.track(message);
        };

        var ignore = function (newRules) {
            ignoreRules = ignoreRules.concat(newRules);

            var onError = function (errorPayload) {
                var isToBeIgnored;

                var isMatchStandard = function (rulePropValueOrRegex, errorValue) {
                    var isAssertTrue = rulePropValueOrRegex instanceof RegExp ? rulePropValueOrRegex.test(errorValue) : rulePropValueOrRegex === errorValue;
                    return isAssertTrue;
                };

                var isMatchNetwork = function (rulePropValueOrRegex, networkProperty) {
                    var isAssertTrue = errorPayload.network
                            .map(function (networkObj) {
                                return isMatchStandard(rulePropValueOrRegex, networkObj[networkProperty]);
                            })
                            .some(function (isMatching) {
                                return isMatching === true;
                            });

                    return isAssertTrue;
                };

                var isMatching = function (rule) {
                    var propMatchResults = [];
                    var isFullyMatchingWithIgnoreRule;

                    for (var property in rule) {
                        var expectedValue = rule[property];

                        if (property === 'pageUrl') {
                            propMatchResults.push(isMatchStandard(expectedValue, errorPayload.url));
                        } else if (property === 'message') {
                            propMatchResults.push(isMatchStandard(rule.message, errorPayload.message));
                        } else {
                            propMatchResults.push(isMatchNetwork(expectedValue, property));
                        }
                    }

                    isFullyMatchingWithIgnoreRule = propMatchResults.every(function (submatchingResult) {
                        return submatchingResult === true;
                    });

                    return isFullyMatchingWithIgnoreRule;
                };


                isToBeIgnored = ignoreRules
                    .map(isMatching)
                    .some(function (isMatching) {
                        return isMatching === true;
                    });

                return !isToBeIgnored; // Returning inverse of isToBeIgnored. (A false return value means error will be swallowed.)
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
    }]);

    angular.module('trackJs').provider('TrackJs', function () {
        this.configure = configure(window);
        this.$get = angular.noop;
    });

})(angular);
