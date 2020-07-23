import React from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import { FormattedPrice } from 'vtex.formatted-price'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'
import { parseTextAlign, TextAlignProp } from './utils/textAlign'
import styles from './styles.css'

const CSS_HANDLES = [
  'productPriceContainer',
  'productPriceCurrency',
  'productPrice',
] as const

type PriceProps = TextAlignProp & {
  showListPrice: boolean
}

const Price: StorefrontFunctionComponent<PriceProps> = ({
  textAlign = 'left',
  showListPrice = true,
}) => {
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  return (
    <div
      className={`${opaque(item.availability)} ${styles.price} ${
        handles.productPriceContainer
      } ${parseTextAlign(textAlign)}`}
    >
      {item.listPrice && item.listPrice !== item.price && showListPrice && (
        <div
          id={`list-price-${item.id}`}
          className={`${handles.productPriceCurrency} c-muted-1 strike t-mini mb2`}
        >
          <FormattedCurrency
            value={
              (item.listPrice * (item.unitMultiplier || 1) * item.quantity) /
              100
            }
          />
        </div>
      )}
      <div
        id={`price-${item.id}`}
        className={`${handles.productPrice} div fw6 fw5-m`}
      >
        {item.sellingPrice && (
          <FormattedPrice value={(item.sellingPrice * item.quantity) / 100} />
        )}
      </div>
    </div>
  )
}

Price.schema = {
  properties: {
    textAlign: {
      type: 'string',
      default: 'left',
      isLayout: true,
    },
  },
}

export default Price
