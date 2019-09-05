# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Change events now send the item's `uniqueId` instead of its `index`.

## [0.5.0] - 2019-08-27

### Changed

- Price per unit text is now translated.

## [0.4.0] - 2019-08-26

### Removed

- Removed "Cart" title from component.

## [0.3.1] - 2019-08-20

### Changed

- Changed UI details to make layout work well and to improve some components' behavior.

## [0.3.0] - 2019-08-19

### Changed

- Replaced the implemented currency component in favor of `FormattedCurrency` from `vtex.format-currency`.

## [0.2.1] - 2019-08-19

### Fixed

- Fix bug that caused the component to break when a huge value was input in the quantity selector.

## [0.2.0] - 2019-08-15

### Changed

- Improved UI for all device types.

## [0.1.0] - 2019-08-13

### Added

- Initial version of `ProductList` that implements some minimum functionalities.
