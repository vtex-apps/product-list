import type { FunctionComponent } from 'react'
import React from 'react'
import type { SkuSpecification } from 'vtex.checkout-graphql'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'

const CSS_HANDLES = [
  'productVariationsContainer',
  'productVariationsItem',
  'productVariationItem__labels',
  'productVariationItem__labels_sku_specification',
  'productVariationItem__labels_sku_name'
] as const

const ProductVariations: FunctionComponent = () => {
  const { item } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  return item.skuSpecifications && item.skuSpecifications.length > 0 ? (
    <div
      className={`c-muted-1 f6 lh-copy ${
        handles.productVariationsContainer
      } ${opaque(item.availability)}`}
    >
      {item.skuSpecifications.map((spec: SkuSpecification) => {
        return (
          <div
            className={handles.productVariationsItem}
            id={`specification-${item.id}-${spec.fieldName}`}
            key={spec.fieldName || undefined}
          >
            <div className={handles.productVariationItem__labels}><label className={handles.productVariationItem__labels_sku_specification}>{`${spec.fieldName}`}</label>: <label className={handles.productVariationItem__labels_sku_name}>{`${spec.fieldValues.join(', ')}`}</label></div>
          </div>
        )
      })}
    </div>
  ) : null
}

export default ProductVariations
