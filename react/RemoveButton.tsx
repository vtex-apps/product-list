import React, { FunctionComponent } from 'react'
import { IconDelete } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { Loading } from 'vtex.render-runtime'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

const CSS_HANDLES = ['removeButtonContainer', 'removeButton'] as const

const RemoveButton: FunctionComponent = () => {
  const { item, loading, onRemove } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  return (
    <div
      className={`${handles.removeButtonContainer} ${opaque(
        item.availability
      )}`}
    >
      <button
        id={`remove-button-${item.id}`}
        className={`${handles.removeButton} pointer bg-transparent bn pa2`}
        title="remove"
        onClick={onRemove}
      >
        <IconDelete color="#727273" />
      </button>
    </div>
  )
}

export default RemoveButton
