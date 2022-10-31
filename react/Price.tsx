import React from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import { FormattedPrice } from 'vtex.formatted-price'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

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
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  // Setting a new selling price with all the decimals units
  const newSellingPrice =
    item.price && item.unitMultiplier
      ? item.price * item.unitMultiplier
      : item.sellingPrice

  return (
    <div
      className={`${opaque(item.availability)} ${styles.price} ${
        handles.productPriceContainer
      } ${parseTextAlign(textAlign)}`}
    >
      {item.listPrice && item.listPrice !== newSellingPrice && showListPrice && (
        <div
          id={`list-price-${item.id}`}
          className={`${handles.productPriceCurrency}  ${applyModifiers(
            handles.productPriceCurrency,
            newSellingPrice === 0 ? 'gift' : ''
          )} c-muted-1 strike t-mini mb2`}
        >
          <FormattedCurrency
            value={
              (item.listPrice * (item.unitMultiplier ?? 1) * item.quantity) /
              100
            }
          />
        </div>
      )}
      <div
        id={`price-${item.id}`}
        className={`${handles.productPrice} ${applyModifiers(
          handles.productPrice,
          newSellingPrice === 0 ? 'gift' : ''
        )} div fw6 fw5-m`}
      >
        <FormattedPrice
          value={
            newSellingPrice != null
              ? (newSellingPrice * item.quantity) / 100
              : newSellingPrice
          }
        />
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
