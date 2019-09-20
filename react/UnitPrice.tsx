import React from 'react'
import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'

import { useItemContext } from './components/ItemContext'
import styles from './styles.css'
import { opaque } from './utils/opaque'

interface Props {
  textAlign: 'left' | 'center'
}

const align = (prop: string) => {
  switch (prop) {
    case 'left':
      return 'tl'
    case 'center':
      return 'tc'
    default:
      return ''
  }
}

const UnitPrice: StorefrontFunctionComponent<Props> = ({ textAlign }) => {
  const { item } = useItemContext()

  return item.quantity > 1 ? (
    <div
      className={`t-mini c-muted-1 lh-title ${styles.quantity} ${opaque(
        item.availability
      )} ${align(
        textAlign
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

UnitPrice.defaultProps = {
  textAlign: 'left',
}

UnitPrice.schema = {
  properties: {
    textAlign: {
      type: 'string',
      default: UnitPrice.defaultProps.textAlign,
      isLayout: true,
    },
  },
}

export default UnitPrice
