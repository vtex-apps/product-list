import React, { FunctionComponent } from 'react'
import { FormattedCurrency } from 'vtex.format-currency'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

import styles from './styles.css'

const Price: FunctionComponent = () => {
  const { item } = useItemContext()

  return (
    <div className={`${opaque(item.availability)} ${styles.price} tr-m`}>
      <div className="">
        {item.listPrice !== item.price && (
          <div className="c-muted-1 strike t-mini mb2">
            <FormattedCurrency value={(item.listPrice * item.quantity) / 100} />
          </div>
        )}
        <div className="div fw6 fw5-m">
          <FormattedCurrency
            value={(item.sellingPrice * item.quantity) / 100}
          />
        </div>
      </div>
    </div>
  )
}

export default Price
