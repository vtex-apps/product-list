import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './components/ItemContext'

const CSS_HANDLES = ['productQuantityUnit'] as const

const ProductQuantity: React.FC = () => {
  const { item } = useItemContext()
  const cssHandles = useCssHandles(CSS_HANDLES)

  return (
    <span className={`${cssHandles.productQuantityUnit} c-muted-1 t-body`}>
      <FormattedMessage
        id="store/product-list.quantity-units"
        values={{ quantity: item.quantity }}
      />
    </span>
  )
}

export default ProductQuantity
