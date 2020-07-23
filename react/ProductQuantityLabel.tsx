import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'

const CSS_HANDLES = ['productQuantityLabel'] as const

const ProductQuantityLabel: React.FC = () => {
  const { item } = useItemContext()
  const cssHandles = useCssHandles(CSS_HANDLES)

  return (
    <span className={`${cssHandles.productQuantityLabel} c-muted-1 t-body`}>
      <FormattedMessage
        id="store/product-list.quantity-label"
        values={{ quantity: item.quantity }}
      />
    </span>
  )
}

export default ProductQuantityLabel
