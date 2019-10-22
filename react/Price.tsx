import React from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import { FormattedPrice } from 'vtex.formatted-price'

import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Loading } from 'vtex.render-runtime'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'
import { parseTextAlign, TextAlignProp } from './utils/textAlign'

import styles from './styles.css'

const Price: StorefrontFunctionComponent<TextAlignProp> = ({ textAlign }) => {
  const { item } = useItemContext()
  const { loading } = useOrderForm()

  if (loading) {
    return <Loading />
  }

  return (
    <div
      className={`${opaque(item.availability)} ${styles.price} ${parseTextAlign(
        textAlign
      )}`}
    >
      <div>
        {item.listPrice !== item.price && (
          <div
            id={`list-price-${item.id}`}
            className="c-muted-1 strike t-mini mb2"
          >
            <FormattedCurrency value={(item.listPrice * item.quantity) / 100} />
          </div>
        )}
        <div id={`price-${item.id}`} className="div fw6 fw5-m">
          <FormattedPrice value={(item.sellingPrice * item.quantity) / 100} />
        </div>
      </div>
    </div>
  )
}

Price.defaultProps = {
  textAlign: 'left',
}

Price.schema = {
  properties: {
    textAlign: {
      type: 'string',
      default: Price.defaultProps.textAlign,
      isLayout: true,
    },
  },
}

export default Price
