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
