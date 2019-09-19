import React from 'react'
import { FormattedCurrency } from 'vtex.format-currency'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

import styles from './styles.css'

interface Props {
  textAlign: 'left' | 'right'
}

const align = (prop: string) => {
  switch (prop) {
    case 'left':
      return 'tl'
    case 'right':
      return 'tr'
    default:
      return ''
  }
}

const Price: StorefrontFunctionComponent<Props> = ({ textAlign }) => {
  const { item } = useItemContext()

  return (
    <div
      className={`${opaque(item.availability)} ${styles.price} ${align(
        textAlign
      )}`}
    >
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
