angular-trackjs
===============

A simple AngularJS module for adding TrackJS to angulars exception handler.
 
You need to include the trackJS script before your angular app. You can signup at [trackjs.com](trackjs.com)
        
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
