import React, { FunctionComponent } from 'react'

import Selector from './components/QuantitySelector'
import { useItemContext } from './components/ItemContext'
import { AVAILABLE } from './constants/Availability'
import { opaque } from './utils/opaque'

import styles from './styles.css'

const MAX_ITEM_QUANTITY = 99999

const QuantitySelector: FunctionComponent = () => {
  const { item, onQuantityChange } = useItemContext()

  return (
    <div
      className={`${opaque(item.availability)} ${styles.quantity} ${
        styles.quantitySelector
      }`}
    >
      <Selector
        value={item.quantity}
        maxValue={MAX_ITEM_QUANTITY}
        onChange={onQuantityChange}
        disabled={item.availability !== AVAILABLE}
      />
    </div>
  )
}

export default QuantitySelector
