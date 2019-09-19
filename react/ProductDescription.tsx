import React, { FunctionComponent } from 'react'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

const ProductDescription: FunctionComponent = () => {
  const { item } = useItemContext()

  return (
    <div
      className={`flex-auto w-100 flex mb4 mr7-m ${opaque(item.availability)}`}
    >
      {/* Brand and Name */}
      <div className="flex-auto">
        <div className="ttu f7 fw6 c-muted-1 mb2 fw5-m">
          {item.additionalInfo.brandName}
        </div>
        <div>
          <a
            className="c-on-base t-title lh-copy fw6 no-underline fw5-m"
            href={item.detailUrl}
          >
            {item.name}
          </a>
        </div>
        {/* Variations */}
        {item.skuSpecifications && item.skuSpecifications.length > 0 && (
          <div className="mt2 c-muted-1 f6 lh-copy">
            {item.skuSpecifications.map(
              (spec: SKUSpecification, idx: number) => {
                return (
                  <div key={idx}>
                    {`${spec.fieldName}: ${spec.fieldValues.join(', ')}`}
                  </div>
                )
              }
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDescription
