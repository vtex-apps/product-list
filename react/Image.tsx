import React, { FunctionComponent } from 'react'

import { useItemContext } from './components/ItemContext'
import { NoImageIcon } from './components/NoImageIcon'
import { opaque } from './utils/opaque'

const Image: FunctionComponent = () => {
  const { item } = useItemContext()

  return (
    <div
      id={`image-${item.id}`}
      className={opaque(item.availability)}
      style={{ minWidth: '96px' }}
    >
      <a href={item.detailUrl}>
        {item.imageUrl ? (
          <img
            className="br2"
            alt={item.name}
            src={item.imageUrl}
            width="100%"
          />
        ) : (
          <NoImageIcon />
        )}
      </a>
    </div>
  )
}

export default Image
