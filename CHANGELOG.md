# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.15.4] - 2019-12-30
### Changed
- Improved React typings.
- Improved linter and fixed resulting errors.
- Styles builder updated to major 2.

## [0.15.3] - 2019-12-30
### Changed
- Security updates.

## [0.15.2] - 2019-12-23
### Fixed
- Product list layout.

## [0.15.1] - 2019-12-23
### Changed
- Messages now reflect decisions made when implementing errors in shipping-calculator: `your cart` and `item` are now `the cart` and `product`.

## [0.15.0] - 2019-12-20
### Added
- Support for CSS customization through the use of CSS handles.

## [0.14.6] - 2019-12-19
### Removed
- "Remove" button from availability message.

## [0.14.5] - 2019-12-18
### Added
- Documentation on how to use this component on the blocks-structure level.

## [0.14.4] - 2019-12-03
### Fixed
- Desktop skeleton appearing on phone screens.

## [0.14.3] - 2019-11-25
### Fixed
- Skeleton appearance was delayed.

## [0.14.2] - 2019-11-21
### Changed
- Component's preview width values, in order to keep the expected behavior on mobile devices.

## [0.14.1] - 2019-11-21
### Changed
- Margins in mobile version.
- Font weight.

## [0.14.0] - 2019-11-19
### Added
- New `item` argument to callback functions `onQuantityChange` and `onRemove` passed to `ProductList` component.

## [0.13.2] - 2019-11-08
### Changed
- `interfaces` preview structure.

## [0.13.1] - 2019-11-05
### Changed
- `image` interface name to `product-list-image`.

## [0.13.0] - 2019-11-01
### Changed
- Images with higher resolutions are now displayed if the user device has retina screen.

## [0.12.0] - 2019-10-30
### Added
- Preview skeleton to replace loading spinner.

## [0.11.6] - 2019-10-24
### Added
- `testId` prop to `Dropdown` component in order to allow the proper tests.

## [0.11.5] - 2019-10-23
### Changed
- Every remove button `id` has item's identifier now.

## [0.11.4] - 2019-10-23
### Changed
- Improvements to `id` attribution of some elements.

## [0.11.3] - 2019-10-23
### Added
- "Remove" label to option zero in the quantity selector dropdown.

## [0.11.2] - 2019-10-18
### Added
- `ids` to Styleguide components and HTML elements.

## [0.11.1] - 2019-10-16
### Fixed
- Bug that caused the product name to move slightly when the selected quantity changed between 1 and any other number.

## [0.11.0] - 2019-10-16
### Changed
- Quantity selector now allows selecting the value zero.

### Fixed
- Bug that caused the component to crash when a negative number was input into the quantity selector.

## [0.10.0] - 2019-10-10
### Changed
- When the selling price of an item is zero, the text "FREE" is shown in place of the price and the price per unit is not shown, even when the item quantity is greater than one.

## [0.9.0] - 2019-10-04
### Added
- Icon to replace the product image when its `imageUrl` is `null`.

## [0.8.0] - 2019-10-04
### Changed
- `ListItem` was broken into several smaller components in order to implement the `blocks` structure using `flex-layout`.
- Moved `README.md` location to comply with IO Docs Builder requirements.

## [0.7.0] - 2019-09-09
### Added
- UI for unavailable items.

## [0.6.0] - 2019-09-05
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
