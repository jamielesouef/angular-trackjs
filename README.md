[![Build Status](https://travis-ci.org/jamielesouef/angular-trackjs.svg?branch=master)](https://travis-ci.org/jamielesouef/angular-trackjs) [![Coverage Status](https://coveralls.io/repos/jamielesouef/angular-trackjs/badge.png?branch=master)](https://coveralls.io/r/jamielesouef/angular-trackjs?branch=master)
angular-trackjs
===============

A simple AngularJS module for adding TrackJS to Angular's exception handler.

You need to include the trackJS script before your angular app. You can signup at [trackjs.com](trackjs.com)

##Install

####Bower

	bower install angular-trackjs --save

#### git

In your vendors folder:

	git clone https://github.com/jamielesouef/angular-trackjs.git

###Add to your project
Add after angular files but before your app files

	<script src="your_bower_path/angular-trackjs/dist/angular-trackjs.min.js"></script>

##Usage

### Exception decorator

Just add the module as a dependancy. The module handles decorating Angular's $exceptionHandler.

	var myApp = angular.module('myApp', ['trackJs']);

If you want to pass options to trackJS, you can via the TrackJsProvider in your apps config block. All options can be found in the trackJS API [docs](http://docs.trackjs.com/Api_Reference/trackJs.configure).

	myApp.config(function (TrackJsProvider) {
  		TrackJsProvider.configure(
    	{
      		sessionId: "",
      		userId: "",
      		version: ""
    	});
	});

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

### Configure trackJS after init
There are a small amount of arguments that can be configured after trackJS has initilized. View the trackJS [docs](http://docs.trackjs.com/Api_Reference/trackJs.configure). for more info

	// Setting config options in a controller

    myApp.controller('MainCtrl', function($scope, trackJs) {
       trackJs.configure({sessionId: 2312341234});
    });


##Tests & build
angular-trackjs uses gulp to run test and build tasks

	npm install
	gulp test
	gulp build

