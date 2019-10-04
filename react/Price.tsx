import React from 'react'
import { FormattedCurrency } from 'vtex.format-currency'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'
import { parseTextAlign, TextAlignProp } from './utils/textAlign'

import styles from './styles.css'

const Price: StorefrontFunctionComponent<TextAlignProp> = ({ textAlign }) => {
  const { item } = useItemContext()

  return (
    <div
      className={`${opaque(item.availability)} ${styles.price} ${parseTextAlign(
        textAlign
      )}`}
    >
      <div>
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
