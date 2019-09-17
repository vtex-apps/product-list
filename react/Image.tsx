import React, { FunctionComponent } from 'react'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

const Image: FunctionComponent = () => {
  const { item } = useItemContext()

  return (
    <div
      className={`mr5 mr6-m ${opaque(item.availability)}`}
      style={{ minWidth: '96px' }}
    >
      <a href={item.detailUrl}>
        <img alt={item.name} src={item.imageUrl} width="100%" />
      </a>
    </div>
  )
}

export default Image
