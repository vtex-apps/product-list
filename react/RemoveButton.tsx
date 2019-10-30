import React, { FunctionComponent } from 'react'
import { IconDelete } from 'vtex.styleguide'

import { Loading } from 'vtex.render-runtime'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

const RemoveButton: FunctionComponent = () => {
  const { item, loading, onRemove } = useItemContext()

  if (loading) {
    return <Loading />
  }

  return (
    <div className={opaque(item.availability)}>
      <button
        id={`remove-button-${item.id}`}
        className="pointer bg-transparent bn pa2"
        title="remove"
        onClick={onRemove}
      >
        <IconDelete color="#727273" />
      </button>
    </div>
  )
}

export default RemoveButton
