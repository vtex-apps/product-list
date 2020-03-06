import React from 'react'
import { FormattedMessage } from 'react-intl'

import { useItemContext } from './components/ItemContext'

const ProductQuantity: React.FC = () => {
  const { item } = useItemContext()

  return (
    <span className="c-muted-1 t-body">
      <FormattedMessage
        id="store/product-list.quantity-units"
        values={{ quantity: item.quantity }}
      />
    </span>
  )
}

export default ProductQuantity
