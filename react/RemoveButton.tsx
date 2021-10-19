import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Loading } from 'vtex.render-runtime'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Button } from 'vtex.styleguide'
import { IconDelete } from 'vtex.store-icons'

import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'

const CSS_HANDLES = ['removeButtonContainer', 'removeButton', 'item'] as const

type DisplayMode = 'icon-button' | 'text-button'
type Variation =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverted-tertiary'
  | 'danger'
  | 'danger-tertiary'

interface Props {
  displayMode?: DisplayMode
  variation?: Variation
}

function RemoveButton(props: Props) {
  const { displayMode = 'icon-button', variation = 'danger' } = props
  const { item, loading, onRemove } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  if (displayMode === 'text-button') {
    return (
      <Button variation={variation} onClick={onRemove}>
        <FormattedMessage id="store/product-list.delete-button.default-label" />
      </Button>
    )
  }

  return (
    <div
      className={`${handles.removeButtonContainer} ${applyModifiers(
        handles.item,
        item.sellingPrice === 0 ? 'gift' : ''
      )} ${opaque(item.availability)}`}
    >
      <button
        id={`remove-button-${item.id}`}
        style={{ color: '#727273' }}
        className={`${handles.removeButton} pointer bg-transparent bn pa2`}
        title="remove"
        onClick={onRemove}
      >
        <IconDelete />
      </button>
    </div>
  )
}

export default RemoveButton
