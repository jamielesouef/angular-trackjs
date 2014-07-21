[![Build Status](https://travis-ci.org/jamielesouef/angular-trackjs.svg?branch=master)](https://travis-ci.org/jamielesouef/angular-trackjs) [![Coverage Status](https://coveralls.io/repos/jamielesouef/angular-trackjs/badge.png?branch=master)](https://coveralls.io/r/jamielesouef/angular-trackjs?branch=master)
angular-trackjs
===============

A simple AngularJS module for adding TrackJS to angulars exception handler.

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

Just add the module as a depenancy. The module handles decorating Angular's $exceptionHandler.

	var myApp = angular.module('myApp', ['angular-trackjs']);

If you want to pass options to trackJS, you can via the TrackJsProvider in your apps config block. All options can be found in the trackJS API [docs](http://docs.trackjs.com/Api_Reference/trackJs.configure).

	myApp.config(function (TrackJsProvider) {
  		TrackJsProvider.config(
    	{
      		sessionId: "",
      		userId: "",
      		version: ""
    	});
	});

##Tests & Build
angular-trackjs uses gulp to run test and build tasks

	npm install
	gulp test
	gulp build

