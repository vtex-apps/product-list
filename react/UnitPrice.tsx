import React from 'react'
import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
import styles from './styles.css'
import { opaque } from './utils/opaque'
import { parseTextAlign, TextAlignProp } from './utils/textAlign'

const CSS_HANDLES = [
  'unitPriceContainer',
  'unitPricePerUnitCurrency',
  'unitPriceMeasurementUnit',
  'unitListPrice',
] as const

interface UnitPriceProps extends TextAlignProp {
  unitPriceType: UnitPriceType
  unitPriceDisplay: UnitPriceDisplayType
  displayUnitListPrice: DisplayUnitListPriceType
}

type UnitPriceDisplayType = 'always' | 'default'

type DisplayUnitListPriceType = 'showWhenDifferent' | 'notShow'

type UnitPriceType = 'price' | 'sellingPrice'

const UnitPrice: StorefrontFunctionComponent<UnitPriceProps> = ({
  textAlign = 'left',
  unitPriceType = 'price',
  unitPriceDisplay = 'default',
  displayUnitListPrice = 'notShow',
}) => {
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return null
  }

  const unitPrice = item[unitPriceType] ?? 0

  return (item.quantity > 1 || unitPriceDisplay === 'always') &&
    unitPrice > 0 ? (
    <div
      id={`unit-price-${item.id}`}
      className={`t-mini c-muted-1 lh-title ${handles.unitPriceContainer} ${
        styles.quantity
      } ${opaque(item.availability)} ${parseTextAlign(textAlign)}`}
    >
      {item.listPrice &&
        unitPrice !== item.listPrice &&
        displayUnitListPrice === 'showWhenDifferent' && (
          <div className={`strike ${handles.unitListPrice}`}>
            <FormattedCurrency value={item.listPrice / 100} />
          </div>
        )}
      <FormattedMessage
        id="store/product-list.pricePerUnit"
        values={{
          price: (
            <div className={`${handles.unitPricePerUnitCurrency} dib`}>
              <FormattedCurrency value={unitPrice / 100} />
            </div>
          ),
          perMeasurementUnit: (
            <div className={`${handles.unitPriceMeasurementUnit} dib`}>
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

UnitPrice.schema = {
  properties: {
    textAlign: {
      type: 'string',
      default: 'left',
      isLayout: true,
    },
  },
}

export default UnitPrice
