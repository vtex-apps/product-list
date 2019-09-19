import React, { FunctionComponent } from 'react'
import { IconDelete } from 'vtex.styleguide'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

import styles from './styles.css'

const RemoveButton: FunctionComponent = () => {
  const { item, onRemove } = useItemContext()

  return (
    <div
      className={`${opaque(item.availability)} ${
        styles.remove
      }`}
    >
      <button
        className="pointer bg-transparent bn pa2 ml6"
        onClick={onRemove}
      >
        <IconDelete color="#727273" />
      </button>
    </div>
  )
}

export default RemoveButton
