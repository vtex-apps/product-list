import React, { FunctionComponent } from 'react'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

const ProductBrand: FunctionComponent = () => {
  const { item } = useItemContext()

  return (
    <div className={`ttu f7 fw6 c-muted-1 fw5-m ${opaque(item.availability)}`}>
      {item.additionalInfo.brandName}
    </div>
  )
}

export default ProductBrand
