#	CHANGELOG

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
