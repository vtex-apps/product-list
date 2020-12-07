import React from 'react'
import classnames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'
import type { TextAlignProp } from './utils/textAlign'
import { parseTextAlign } from './utils/textAlign'
import styles from './styles.css'

const CSS_HANDLES = [
  'unitPriceContainer',
  'unitPricePerUnitCurrency',
  'unitPriceMeasurementUnit',
  'unitListPrice',
] as const

interface UnitPriceProps extends TextAlignProp {
  unitPriceType?: UnitPriceType
  unitPriceDisplay?: UnitPriceDisplayType
  displayUnitListPrice?: DisplayUnitListPriceType
}

type UnitPriceDisplayType = 'always' | 'default'

type DisplayUnitListPriceType = 'showWhenDifferent' | 'notShow'

type UnitPriceType = 'price' | 'sellingPrice'

const UnitPrice: React.FC<UnitPriceProps> = ({
  textAlign = 'left',
  unitPriceType = 'sellingPrice',
  unitPriceDisplay = 'default',
  displayUnitListPrice = 'notShow',
}) => {
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)
  const intl = useIntl()
  const isManualPriceDefined =
    item.sellingPrice === item.manualPrice && item.sellingPrice !== item.price

  if (loading) {
    return null
  }

  const unitPrice = item[unitPriceType] ?? 0

  if (
    !(
      (item.quantity > 1 || unitPriceDisplay === 'always') &&
      unitPrice > 0 &&
      !isManualPriceDefined
    )
  ) {
    return null
  }

  return (
    <div
      id={`unit-price-${item.id}`}
      className={classnames(
        handles.unitPriceContainer,
        opaque(item.availability),
        parseTextAlign(textAlign),
        // kept for backwards compatibility
        styles.quantity,
        styles.unitPrice,
        't-mini c-muted-1 lh-title'
      )}
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
                values={{
                  unitMultiplier: intl.formatNumber(item.unitMultiplier ?? 1),
                  measurementUnit: item.measurementUnit,
                }}
              />
            </div>
          ),
        }}
      />
    </div>
  )
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
