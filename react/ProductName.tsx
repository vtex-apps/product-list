import React, { FunctionComponent } from 'react'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

const ProductName: FunctionComponent = () => {
  const { item } = useItemContext()

  return (
    <a
      id={`name-${item.id}`}
      className={`c-on-base t-title lh-copy fw6 no-underline fw5-m ${opaque(
        item.availability
      )}`}
      href={item.detailUrl}
    >
      {item.name}
    </a>
  )
}

export default ProductName
