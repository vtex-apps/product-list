# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.37.2] - 2023-05-12
### Fixed
- Fixes of i18n on readme.md according to task LOC-10667.

## [0.37.1] - 2023-02-27

### Fixed
- Duplicated keys when product is splitted in minicart

## [0.37.0] - 2023-02-27

### Added

- Bulgarian, Catalan, Czech, German, Greek, French, Italian, Dutch, Polish, Russian, Slovakian, Swedish, Thai and Ukrainian translations.

### Fixed 

- Danish, English, Finnish, Korean, Indonesian and Romanian translation.
- Crowdin configuration file.

## [0.36.0] - 2023-01-02

### Added
- Indonesian translation.

## [0.35.1] - 2022-07-27

### Fixed
- Lint issues

## [0.35.0] - 2022-02-22

### Added
- Norwegian and Norwegian variant translation.

## [0.34.1] - 2022-01-24
### Fixed
- `QuantitySelector` is no longer disabled when items are unavailable because they cannot be delivered. This allow users to change the quantity of the item back to when it didn't exceed the maximum weight chosen for deliveries.

## [0.34.0] - 2022-01-12
### Added
- gift class in `QuantitySelector` and `Price`

## [0.33.1] - 2021-10-14


### Fixed
- List price is now displayed when discount is applied by a promotion

## [0.33.0] - 2021-10-14
### Added
- CSS Handles `item` in `RemoveButton` component

## [0.32.0] - 2021-09-29
### Added
- I18n Ar, Hu.

## [0.31.0] - 2021-08-02
### Added
- Prop `quantitySelectorStep` to `quantity-selector` block.

## [0.30.0] - 2021-07-28
### Added
- CSS Handles in QuantityStepper

## [0.29.0] - 2021-04-26

### Added
- I18n Da, Fi, Ja, Ko and Ro.

### Changed
- Crowdin configuration file.

## [0.28.2] - 2021-02-25
### Fixed
- Product image component without rootPath in the URL

## [0.28.1] - 2021-02-22
### Fixed
- Product List with rootPath in the URL

## [0.28.0] - 2021-01-19
### Added
- Lazy rendering to items.
- lazyRenderHeight and lazyRenderOffset props.

## [0.27.2] - 2020-12-21

### Fixed
- `ItemContextWrapper` key.
## [0.27.1] - 2020-12-18
### Fixed
- Item not being removed when changing quantity to zero in dropdown.

## [0.27.0] - 2020-12-10
### Added
- Prop `mode` to `quantity-selector` block and `QuantityStepper` component.

## [0.26.1] - 2020-12-07
### Added
- Support for unit multiplier in quantity selector.

## [0.26.0] - 2020-11-12

### Added
- New component called 'product-reference', where is possible to pull an identifier product information.

## [0.25.0] - 2020-10-27

### Added
- `totalAvailable` and `distinctAvailable` values for `itemCountMode`.

## [0.24.3] - 2020-10-13
### Changed
- Change unitPriceType prop from UnitPrice default value to 'sellingPrice'.

## [0.24.2] - 2020-10-06
### Fixed
- Set useRenderOnView false by default to make it compatible with previous ProductList instances.

### Fixed
- Optimize ProductList initial render time with useRenderOnView hook.

## [0.24.0] - 2020-09-29
### Added
- Now the price can be manually defined.

### Changed
- Hides unit price when the price is defined manually.

## [0.23.3] - 2020-09-17
### Fixed
- Consistency when changing `QuantitySelector` combobox and input

## [0.23.2] - 2020-09-16
### Added
- Attribute `lazy` to product images.

## [0.23.1] - 2020-09-16
### Fixed
- Avoid Dropdown error message by using placeholder as empty space.

## [0.23.0] - 2020-09-14

### Added
- Prop `unitPriceType` to `unit-price` block.

## [0.22.0] - 2020-09-11
### Added
- Support for customization of the `IconRemove` icon, since it now comes from `vtex.store-icons`.

## [0.21.2] - 2020-09-09
### Changed
- Memoize product list items and avoid re-rendering unmodified items.

## [0.21.1] - 2020-08-26
### Fixed
- Price not shown as "free" label when it is zero.

## [0.21.0] - 2020-07-29
### Added
- Prop `unitPriceDisplay` to `unit-price` block.
- Prop `displayUnitListPrice` to `unit-price` block.

## [0.20.2] - 2020-06-22
### Changed
- Add app prefix to `product-name` block usage to avoid conflicts.

## [0.20.1] - 2020-06-18
### Fixed
- Updated README.md file

## [0.20.0] - 2020-05-19
### Added
- Props `variation` and `displayMode` to `remove-button`.

## [0.19.4] - 2020-05-08
### Fixed
- Item prices when `unitMultiplier` was different than `1`.

## [0.19.3] - 2020-03-25

## [0.19.2] - 2020-03-25

### Changed
- Moved `ItemContext` to react folder.

## [0.19.1] - 2020-03-16

## [0.19.0] - 2020-03-09
### Added
- Prop `width` to `product-list-image` block.

## [0.18.1] - 2020-03-09
### Changed
- Rename block `product-quantity` to `product-quantity-label`.

## [0.18.0] - 2020-03-06 [YANKED]
### Added
- New component `ProductQuantity`.
- Prop `showListPrice` to `Price` component.

## [0.17.0] - 2020-01-29
### Added
- `Advanced configuration` section in the documentation.

## [0.16.0] - 2020-01-28
### Changed
- Logic concerning the rendering of `product-list-content-desktop` and `product-list-content-mobile`.

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
