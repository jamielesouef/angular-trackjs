"use strict";

describe('Factory: exceptionHandlerDecorator', function () {

    beforeEach(module('trackJs'));

    var angularTrackJs,
        trackJs,
        payload,
        trackError;

    window.trackJs = {
        track: function (message) {
            trackError = window.trackJs.onError(payload);
        },
        onError: function () {
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

        beforeEach(function () {
            payload = {
                message: '404 Not Found',
                url: 'http://pageurl.com',
                network: [
                    {
                        statusCode: 200,
                        method: 'GET',
                        url: 'http://networkrequesturl.com'
                    },
                    {
                        statusCode: 200,
                        method: 'GET',
                        url: 'http://networkrequesturl.com'
                    },
                    {
                        statusCode: 404,
                        statusMessage: 'Not Found',
                        method: 'GET',
                        url: 'http://networkrequesturl.com'
                    }
                ]
            };
        });

        describe("given an ignore list has been added", function () {

            describe("when the pageUrl", function () {

                describe("does not match", function () {

                    beforeEach(function () {
                        angularTrackJs.ignore([{
                            pageUrl: 'http://noMatch.com'
                        }]);

                        angularTrackJs.track('error');
                    });

                    it('should call the track method', function () {
                        expect(trackError).toBe(true);
                    });
                });

                describe("does match", function () {

                    beforeEach(function () {
                        angularTrackJs.ignore([{
                            pageUrl: 'http://pageurl.com'
                        }]);

                        angularTrackJs.track('error');
                    });

                    it('should not call the track method', function () {
                        expect(trackError).toBe(false);
                    });
                });
            });

            describe("when the message", function () {

                describe("does not match", function () {

                    beforeEach(function () {
                        angularTrackJs.ignore([{
                            message: '401 Not Found'
                        }]);

                        angularTrackJs.track('error');
                    });

                    it('should call the track method', function () {
                        expect(trackError).toBe(true);
                    });

                });

                describe("does match", function () {

                    beforeEach(function () {
                        angularTrackJs.ignore([{
                            message: '404 Not Found'
                        }]);

                        angularTrackJs.track('error');
                    });

                    it('should not call the track method', function () {
                        expect(trackError).toBe(false);
                    });

                });

            });

            describe("when the a network property", function () {

                describe("does not match", function () {
                    beforeEach(function () {
                        angularTrackJs.ignore([{
                            statusCode: 401,
                            method: /get/i
                        }]);

                        angularTrackJs.track('error');
                    });

                    it('should call the track method', function () {
                        expect(trackError).toBe(true);
                    });
                });

                describe("does match", function () {
                    beforeEach(function () {
                        angularTrackJs.ignore([{
                            statusCode: 404,
                            method: /GET/i
                        }]);

                        angularTrackJs.track('error');
                    });

                    it('should not call the track method', function () {
                        expect(trackError).toBe(false);
                    });
                });
            });

            describe("when the a all properties", function () {

                describe("do not match", function () {
                    beforeEach(function () {
                        angularTrackJs.ignore([{
                            message : '401 Not Found',
                            pageUrl: 'http://nomatch.com',
                            statusCode: 401,
                            statusMessage: 'Found',
                            method: /POST/,
                            url: 'http://whatnetwork.com'
                        }]);

                        angularTrackJs.track('error');
                    });

                    it('should call the track method', function () {
                        expect(trackError).toBe(true);
                    });
                });

                describe("do match", function () {
                    beforeEach(function () {
                        angularTrackJs.ignore([{
                            message : '404 Not Found',
                            pageUrl: 'http://pageurl.com',
                            statusCode: 404,
                            statusMessage: 'Not Found',
                            method: 'GET',
                            url: 'http://networkrequesturl.com'
                        }]);

                        angularTrackJs.track('error');
                    });

                    it('should not call the track method', function () {
                        expect(trackError).toBe(false);
                    });
                });
            });
        });
    });
});
