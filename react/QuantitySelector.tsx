import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'

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
      className={`${opaque(item.availability)} ${styles.quantity} flex-none-m`}
    >
      <div className={`${styles.quantitySelector}`}>
        <Selector
          value={item.quantity}
          maxValue={MAX_ITEM_QUANTITY}
          onChange={onQuantityChange}
          disabled={item.availability !== AVAILABLE}
        />
      </div>

      {item.quantity > 1 && (
        <div className="mt3 t-mini c-muted-1 tc-m lh-title">
          <FormattedMessage
            id="store/product-list.pricePerUnit"
            values={{
              price: (
                <div className="dib">
                  <FormattedCurrency value={item.sellingPrice / 100} />
                </div>
              ),
              perMeasurementUnit: (
                <div className="dib">
                  <FormattedMessage
                    id="store/product-list.pricePerUnit.measurementUnit"
                    values={{ measurementUnit: item.measurementUnit }}
                  />
                </div>
              ),
            }}
          />
        </div>
      )}
    </div>
  )
}

export default QuantitySelector
