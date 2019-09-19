import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'

import { useItemContext } from './components/ItemContext'
import styles from './styles.css'
import { opaque } from './utils/opaque'

const UnitPrice: FunctionComponent = () => {
  const { item } = useItemContext()

  return item.quantity > 1 ? (
    <div
      className={`t-mini c-muted-1 tc-m lh-title ${styles.quantity} ${opaque(
        item.availability
      )}`}
    >
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
  ) : null
}

export default UnitPrice
