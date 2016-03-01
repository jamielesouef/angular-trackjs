angular-trackjs
===============

Based on https://github.com/jamielesouef/angular-trackjs.git


A simple AngularJS module for adding TrackJS to Angular's exception handler.

You need to include the trackJS script before your angular app. You can signup at [trackjs.com](trackjs.com)

##Install

####Bower

    bower install angular-trackjs --save

#### git

In your vendors folder:

    git clone https://github.com/SEEK-Jobs/angular-trackjs.git

###Add to your project
Add after angular files but before your app files

    <script src="your_bower_path/angular-trackjs/dist/angular-trackjs.min.js"></script>

##Usage

### Exception decorator

Just add the module as a dependancy. The module handles decorating Angular's $exceptionHandler.

    var myApp = angular.module('myApp', ['trackJs']);

If you want to pass options to trackJS, you can via the TrackJsProvider in your app's config block. All options can be found in the trackJS API [docs](http://docs.trackjs.com/JavaScript_Api_Reference/trackJs.configure).

    myApp.config(function (TrackJsProvider) {
        TrackJsProvider.configure({
            sessionId: "",
            userId: "",
            version: ""
        });
    });

Note that some options, e.g. `application` can only be set prior to the inclusion of the Tracker script, via the `window._trackJs` object. See [docs](http://docs.trackjs.com/JavaScript_Api_Reference/Initialization).

### Custom events
Angular-trackJS wraps the trackJS.track method in an injectable dependancy.

    // using the myApp module example

    myApp.controller('MainCtrl', function($scope, trackJs) {
        var foo = 'val';
        $scope.onButtonPress = function(bar) {
            if (bar !== $scope.foo) {
                trackJs.track('a should have been b');
            }
            // continue logic
        }
    });

### Ignore errors
Sets a whitelist of expected errors so they are not sent up to trackJs. You can check against trackJs onError payload object network properties (`payload.netowrk.*`), `payload.url` and `payload.message`.

Ignore objects can check against String, Int or RegExp

**Note** that `payload.url` is checked using the `pageUrl` property. This is because the network objects also use the property url to log the request url

    // using the myApp module example

    myApp.run(function (trackJs) {
        angularTrackJs.ignore([{
            // If using the `message` prop with XHR ignores, you don't need to specify `method` and `url`, as TrackJs >= 2.1.8 embeds these in `message`
            message: /401 Unauthorized\.: POST https:\/\/whatnetwork\.(com|net|staging)/,
            pageUrl: 'http://nomatch.com',
            statusCode: 401,
            statusMessage: 'Unauthorized',
            method: /POST/,
            url: 'https://whatnetwork.com'
        }])
    });


### Configure trackJS after init
There are a small amount of arguments that can be configured after trackJS has initialised. View the trackJS [docs](http://docs.trackjs.com/JavaScript_Api_Reference/trackJs.configure) for more info.

    // Setting config options in a controller

    myApp.controller('MainCtrl', function($scope, trackJs) {
       trackJs.configure({sessionId: 2312341234});
    });


##Tests & build
angular-trackjs uses gulp to run test and build tasks

    npm install
    npm test
    npm run build
