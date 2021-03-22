import React from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import { FormattedPrice } from 'vtex.formatted-price'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'
import type { TextAlignProp } from './utils/textAlign'
import { parseTextAlign } from './utils/textAlign'
import styles from './styles.css'

const CSS_HANDLES = [
  'productPriceContainer',
  'productPriceCurrency',
  'productPrice',
] as const

type PriceProps = TextAlignProp & {
  showListPrice?: boolean
}

const Price: React.FC<PriceProps> = ({
  textAlign = 'left',
  showListPrice = true,
}) => {
  const { item: referenceItem, items, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  const sellingPrice = items.reduce(
    (price, item) => (item.sellingPrice ?? 0) * item.quantity + price,
    0
  )

  if (loading) {
    return <Loading />
  }

  return (
    <div
      className={`${opaque(items[0].availability)} ${styles.price} ${
        handles.productPriceContainer
      } ${parseTextAlign(textAlign)}`}
    >
      {referenceItem.listPrice != null &&
        referenceItem.listPrice !== referenceItem.price &&
        showListPrice && (
          <div
            id={`list-price-${referenceItem.id}`}
            className={`${handles.productPriceCurrency} c-muted-1 strike t-mini mb2`}
          >
            <FormattedCurrency
              value={
                (referenceItem.listPrice *
                  (referenceItem.unitMultiplier ?? 1) *
                  referenceItem.quantity) /
                100
              }
            />
          </div>
        )}
      <div
        id={`price-${referenceItem.id}`}
        className={`${handles.productPrice} div fw6 fw5-m`}
      >
        <FormattedPrice value={sellingPrice / 100} />
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
