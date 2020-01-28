# Product List

The Product List displays all items in the user's cart and informs the user when some of them are unavailable. Currently, the Product List only works out of the box within the [Minicart](https://github.com/vtex-apps/minicart) and the [Checkout Cart](https://github.com/vtex-apps/checkout-cart).

![image](https://user-images.githubusercontent.com/8902498/71035787-03bfc100-20fb-11ea-914e-51301b3bedf4.png)

## Configuration

1. Add the Product List app to your theme's dependencies in `manifest.json`. For example:

```json
  "dependencies": {
    "vtex.product-list": "0.x"
  }
```

2. Add the `product-list` block to the `minicart-product-list` block of the Minicart or to the `product-list-wrapper` block of the Checkout Cart. For example:

```json
  "minicart-product-list#example": {
    "blocks": ["product-list"]
  }
```

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                          |
| ------------------------------------ |
| `availabilityMessageContainer`       |
| `availabilityMessageTextContainer`   |
| `availabilityMessageText`            |
| `productImageContainer`              |
| `productImageAnchor`                 |
| `productImage`                       |
| `productPriceContainer`              |
| `productPriceCurrency`               |
| `productPrice`                       |
| `productBrandName`                   |
| `productListItem`                    |
| `productListUnavailableItemsMessage` |
| `productListAvailableItemsMessage`   |
| `productName`                        |
| `productVariationsContainer`         |
| `productVariationsItem`              |
| `quantitySelectorContainer`          |
| `removeButtonContainer`              |
| `removeButton`                       |
| `unitPriceContainer`                 |
| `unitPricePerUnitCurrency`           |
| `unitPriceMeasurementUnit`           |
| `quantityDropdownMobileContainer`    |
| `quantityDropdownContainer`          |
| `quantityInputMobileContainer`       |
| `quantityInputContainer`             |

## Advanced Configuration

The `product-list` block can be customized through its blocks structure. The default implementation is currently the following (props were omited):

```jsonc
{
  "product-list": {
    "blocks": [
      "product-list-content-desktop",
      "product-list-content-mobile"
    ]
  },
  "flex-layout.col#product-description": {
    "children": [
      "flex-layout.row#product-brand",
      "flex-layout.row#product-name",
      "flex-layout.row#product-variations"
    ],
    "props": { (...) }
  },
  "flex-layout.row#product-brand": {
    "children": ["product-brand"],
    "props": { (...) }
  },
  "flex-layout.row#product-name": {
    "children": ["product-name"]
  },
  "flex-layout.row#product-variations": {
    "children": ["product-variations"],
    "props": { (...) }
  }
}
```

### Desktop layout

```jsonc
{
  // Desktop layout
  "product-list-content-desktop": {
    "children": ["flex-layout.row#list-row.desktop"]
  },
  "flex-layout.row#list-row.desktop": {
    "children": [
      "flex-layout.col#image.desktop",
      "flex-layout.col#main-container.desktop"
    ],
    "props": { (...) }
  },
  "flex-layout.col#image.desktop": {
    "children": ["product-list-image"],
    "props": { (...) }
  },
  "flex-layout.col#main-container.desktop": {
    "children": [
      "flex-layout.row#sub-container.desktop",
      "flex-layout.row#message.desktop"
    ],
    "props": { (...) }
  },
  "flex-layout.row#sub-container.desktop": {
    "children": [
      "flex-layout.col#product-description",
      "flex-layout.col#quantity.desktop",
      "flex-layout.row#price-remove"
    ],
    "props": { (...) }
  },
  "flex-layout.col#quantity.desktop": {
    "children": [
      "flex-layout.row#quantity-selector.desktop",
      "flex-layout.row#unit-price.desktop"
    ],
    "props": { (...) }
  },
  "flex-layout.row#price-remove": {
    "children": [
      "flex-layout.col#price.desktop",
      "flex-layout.col#remove-button.desktop"
    ],
    "props": { (...) }
  },
  "flex-layout.row#quantity-selector.desktop": {
    "children": ["quantity-selector"],
    "props": { (...) }
  },
  "flex-layout.row#unit-price.desktop": {
    "children": ["unit-price#desktop"],
    "props": { (...) }
  },
  "unit-price#desktop": {
    "props": { (...) }
  },
  "flex-layout.col#price.desktop": {
    "children": ["price#desktop"],
    "props": { (...) }
  },
  "price#desktop": {
    "props": { (...) }
  },
  "flex-layout.col#remove-button.desktop": {
    "children": ["remove-button"],
    "props": { (...) }
  },
  "flex-layout.row#message.desktop": {
    "children": ["message#desktop"],
    "props": { (...) }
  },
  "message#desktop": {
    "props": { (...) }
  }
}
```

### Mobile layout

```jsonc
{
  // Mobile layout (this is default one used by minicart.v2)
  "product-list-content-mobile": {
    "children": ["flex-layout.row#list-row.mobile"]
  },
  "flex-layout.row#list-row.mobile": {
    "children": [
      "flex-layout.col#image.mobile",
      "flex-layout.col#main-container.mobile"
    ],
    "props": { (...) }
  },
  "flex-layout.col#image.mobile": {
    "children": ["product-list-image"],
    "props": { (...) }
  },
  "flex-layout.col#main-container.mobile": {
    "children": [
      "flex-layout.row#top.mobile",
      "flex-layout.row#quantity-selector.mobile",
      "flex-layout.row#unit-price.mobile",
      "flex-layout.row#price.mobile",
      "flex-layout.row#message.mobile"
    ],
    "props": { (...) }
  },
  "flex-layout.row#top.mobile": {
    "children": [
      "flex-layout.col#product-description",
      "flex-layout.col#remove-button.mobile"
    ],
    "props": { (...) }
  },
  "flex-layout.row#quantity-selector.mobile": {
    "children": ["quantity-selector"],
    "props": { (...) }
  },
  "flex-layout.row#unit-price.mobile": {
    "children": ["unit-price"],
    "props": { (...) }
  },
  "flex-layout.row#price.mobile": {
    "children": ["price#mobile"],
    "props": { (...) }
  },
  "price#mobile": {
    "props": { (...) }
  },
  "flex-layout.col#remove-button.mobile": {
    "children": ["remove-button"],
    "props": { (...) }
  },
  "flex-layout.row#message.mobile": {
    "children": ["message#mobile"],
    "props": { (...) }
  },
  "message#mobile": {
    "props": { (...) }
  }
}
```

This means that, when you use `product-list` in your store, you're actually using this default implementation. So, to customize the blocks being used in your own implementation, you could get this default and change it as you like by adding this blocks to your theme and changing their configuration. Just keep in mind that the blocks above will be added into your theme regardless, so you could use them the way you like.