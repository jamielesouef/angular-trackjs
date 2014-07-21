"use strict";

describe('Factory: exceptionHandlerDecorator', function () {

    beforeEach(module('trackJs'));

    var exceptionHandlerDecorator,
        $window;

    beforeEach(inject(function (_$window_, _exceptionHandlerDecorator_) {
        exceptionHandlerDecorator = _exceptionHandlerDecorator_;
        $window = _$window_;
    }));

    it('should return an object with a decorate method', function () {
        expect(exceptionHandlerDecorator.decorate).toEqual(jasmine.any(Function));
        expect(exceptionHandlerDecorator.decorate()).toEqual(jasmine.any(Function));
    });

    describe('when passed an exception and trackJS is available', function () {
        beforeEach(function () {
            $window.trackJs = {
                track: function () {
                }
            };

            spyOn($window.trackJs, 'track');
        });

        it('should fire a tracking event', function () {
            var exception = 'exceptionMessage';
            exceptionHandlerDecorator.decorate(angular.noop)(exception, 'cause');
            expect($window.trackJs.track).toHaveBeenCalledWith(exception);
        });
    });
});
