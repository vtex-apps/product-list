import React, { FunctionComponent } from 'react'

import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Loading } from 'vtex.render-runtime'

import Selector from './components/QuantitySelector'
import { useItemContext } from './components/ItemContext'
import { AVAILABLE } from './constants/Availability'
import { opaque } from './utils/opaque'

import styles from './styles.css'

const MAX_ITEM_QUANTITY = 99999

const QuantitySelector: FunctionComponent = () => {
  const { item, onQuantityChange } = useItemContext()
  const { loading } = useOrderForm()

  if (loading) {
    return <Loading />
  }

  return (
    <div
      className={`${opaque(item.availability)} ${styles.quantity} ${
        styles.quantitySelector
      }`}
    >
      <Selector
        id={item.id}
        value={item.quantity}
        maxValue={MAX_ITEM_QUANTITY}
        onChange={onQuantityChange}
        disabled={item.availability !== AVAILABLE}
      />
    </div>
  )
}

export default QuantitySelector
