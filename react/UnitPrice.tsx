import React from 'react'
import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'

import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Loading } from 'vtex.render-runtime'

import { useItemContext } from './components/ItemContext'
import styles from './styles.css'
import { opaque } from './utils/opaque'
import { parseTextAlign, TextAlignProp } from './utils/textAlign'

const UnitPrice: StorefrontFunctionComponent<TextAlignProp> = ({
  textAlign,
}) => {
  const { item } = useItemContext()
  const { loading } = useOrderForm()

  if (loading) {
    return <Loading />
  }

  return item.quantity > 1 && item.sellingPrice > 0 ? (
    <div
      id={`unit-price-${item.id}`}
      className={`t-mini c-muted-1 lh-title ${styles.quantity} ${opaque(
        item.availability
      )} ${parseTextAlign(textAlign)}`}
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
