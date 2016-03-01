#	CHANGE LOG

## 0.1.1
- **Support** verified working with latest TrackJs 2.2.0 (e.g. the error message format has changed a while ago in version 2.1.8 http://docs.trackjs.com/tracker/changelog.html )

## 0.1.0
- **Finalised** ignore method. Re written to include checking the error message and error url along with all the network properties
- **Add** main files to bower.json [75ff034](https://github.com/jamielesouef/angular-trackjs/commit/75ff034e1f9c9d9d290936c123c086e1dff3f43d)

## 0.0.9
- **Feature** Added ignore method to the trackJs factory. Ignored / expected errors won't be sent off to trackJS keeping the noise down.

## 0.0.8
- **Fixed** readme typo for configure method on provider [bb61597](https://github.com/jamielesouef/angular-trackjs/commit/ed325481c9dc50cf64a0ef8b27cdc29bc1648733)
- **Fixed** Run un-minified distributable through ngAnnotate to allow source to be minified by consumer [ed32548](https://github.com/jamielesouef/angular-trackjs/commit/ed325481c9dc50cf64a0ef8b27cdc29bc1648733)

## 0.0.7

- **Fixed** bug which broke the angular exception decorator
- **Updated** code to be DRY
- **Updated** tests

## 0.0.6

- **Fixed** issue where angular-trackjs would throw an exception in tests

## 0.0.5

Minor update

- **Added** configure to the trackJS factory which wraps the `window.trackJS.configure`.
- **Updated** README

## 0.0.4

-	**Added** trackJS factory which wraps the `window.trackJS.track` into an injectable service
-	**Fixed** incorrect source map path
-	**Fixed** broken gulp watch

## 0.0.3

- **Added** Decorate angular `$exceptionHandler` with TrackJS exception tracking
