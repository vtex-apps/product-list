import React, { FunctionComponent } from 'react'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

const ProductVariations: FunctionComponent = () => {
  const { item } = useItemContext()

  return item.skuSpecifications && item.skuSpecifications.length > 0 ? (
    <div
      id={`${item.id}-specifications`}
      className={`c-muted-1 f6 lh-copy ${opaque(item.availability)}`}
    >
      {item.skuSpecifications
        .map(
          (spec: SKUSpecification) =>
            `${spec.fieldName}: ${spec.fieldValues.join(', ')}`
        )
        .join(' • ')}
    </div>
  ) : null
}

export default ProductVariations
