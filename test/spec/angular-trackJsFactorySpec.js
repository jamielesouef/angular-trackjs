"use strict";

describe('Factory: exceptionHandlerDecorator', function () {

    beforeEach(module('trackJs'));

    var angularTrackJs,
        trackJs,
        payload,
        trackError = true;

    window.trackJs = {
        track: function (message) {
            trackError = window.trackJs.onError(payload);
        },
        onError: function() {
            //return true;
        },
        configure: function (option) {
            angular.extend(window.trackJs, option)
        }
    };

    beforeEach(inject(function (_trackJs_) {
            angularTrackJs = _trackJs_;
            spyOn(window.trackJs, 'track').andCallThrough();
            spyOn(window.trackJs, 'configure').andCallThrough();
        })
    );

    describe('when tracking a custom error and trackjs is available', function () {
        beforeEach(function () {
            angularTrackJs.configure({sessionId: 2341234});
            angularTrackJs.track('my track message');
        });

        it('should call trackJs on the window object', function () {
            expect(window.trackJs.track).toHaveBeenCalledWith('my track message');
        });

        it('should have called the configuration method on the window object', function () {
            expect(window.trackJs.configure).toHaveBeenCalledWith({sessionId: 2341234});
        });
    });

    describe("ignore: ", function () {
        describe("when the error is in the ignore list", function () {
            beforeEach(function () {
                payload = {
                    network: [
                        {
                            statusCode: 404,
                            method: 'GET'
                        }
                    ]
                };

                angularTrackJs.ignore([{
                    statusCode: 404,
                    method: /get/i
                }]);

                angularTrackJs.track('error');
            });

            it('should not call the track method', function () {
                expect(trackError).toBe(false);
            });
        });

        describe("when the error is not in the ignore list", function () {
            beforeEach(function () {
                payload = {
                    network: [
                        {
                            statusCode: 404,
                            method: 'GET'
                        }
                    ]
                };

                angularTrackJs.ignore([{
                    statusCode: 401,
                    method: /get/i
                }]);

                angularTrackJs.track('error');
            });

            it('should not call the track method', function () {
                expect(trackError).toBe(true);
            });
        });
    });
});
