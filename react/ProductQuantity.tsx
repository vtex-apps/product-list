import React from 'react'

import { useItemContext } from './components/ItemContext'

const ProductQuantity: React.FC = () => {
  const { item } = useItemContext()

  return <span className="c-muted-1 t-body">{item.quantity} un.</span>
}

export default ProductQuantity
