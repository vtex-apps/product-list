import classnames from 'classnames'
import React from 'react'
import { useIntl, defineMessages } from 'react-intl'
import { formatCurrency } from 'vtex.format-currency'
import { useRuntime, Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'

const messages = defineMessages({
  free: {
    id: 'store/product-list.priceDiscounts.freeItems',
  },
  nominal: {
    id: 'store/product-list.priceDiscounts.nominalDiscounts',
  },
})

const CSS_HANDLES = [
  'discountTagsWrapper',
  'discountTag',
  'freeItemsDiscountTag',
  'nominalDiscountTag',
] as const

const ProductPriceDiscounts = () => {
  const { items, loading } = useItemContext()
  const intl = useIntl()
  const { culture } = useRuntime()

  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  if (items.length === 0) {
    return null
  }

  const [totalItemsDiscounts, totalFreeItems] = items.reduce(
    ([totalDiscounts, totalFree], item) => {
      if (item.sellingPrice === 0) {
        return [totalDiscounts, totalFree + item.quantity]
      }

      const priceTagsDiscount =
        item.priceTags.length > 0
          ? item.priceTags.reduce(
              (totalPriceTags, priceTag) =>
                totalPriceTags - (priceTag.value ?? 0),
              0
            )
          : 0

      return [totalDiscounts + priceTagsDiscount, totalFree]
    },
    [0, 0]
  )

  return (
    <div className={classnames(handles.discountTagsWrapper, 'flex flex-wrap')}>
      {totalFreeItems > 0 && (
        <span
          className={classnames(
            handles.freeItemsDiscountTag,
            handles.discountTag,
            'bg-success--faded inline-block pa3 br2 self-start lh-title',
            { 'mr4 mb4': totalItemsDiscounts > 0 }
          )}
        >
          {intl.formatMessage(messages.free, {
            totalItems: totalFreeItems,
            // eslint-disable-next-line react/display-name
            b: (chunks: any) => {
              return <span className="b ttu">{chunks}</span>
            },
          })}
        </span>
      )}

      {totalItemsDiscounts > 0 && (
        <span
          className={classnames(
            handles.nominalDiscountTag,
            handles.discountTag,
            'bg-success--faded inline-block pa3 br2 self-start lh-title'
          )}
        >
          {intl.formatMessage(messages.nominal, {
            price: formatCurrency({
              intl,
              culture,
              value: totalItemsDiscounts / 100,
            }),
            // eslint-disable-next-line react/display-name
            b: (chunks: any) => {
              return <span className="b">{chunks}</span>
            },
          })}
        </span>
      )}
    </div>
  )
}

export default ProductPriceDiscounts
