import React, { FunctionComponent } from 'react'

import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Loading } from 'vtex.render-runtime'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

const ProductVariations: FunctionComponent = () => {
  const { item } = useItemContext()
  const { loading } = useOrderForm()

  if (loading) {
    return <Loading />
  }

  return item.skuSpecifications && item.skuSpecifications.length > 0 ? (
    <div className={`c-muted-1 f6 lh-copy ${opaque(item.availability)}`}>
      {item.skuSpecifications.map((spec: SKUSpecification) => {
        return (
          <div
            id={`specification-${item.id}-${spec.fieldName}`}
            key={spec.fieldName}
          >
            {`${spec.fieldName}: ${spec.fieldValues.join(', ')}`}
          </div>
        )
      })}
    </div>
  ) : null
}

export default ProductVariations
