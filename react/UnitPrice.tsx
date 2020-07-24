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
  unitPriceDisplay: UnitPriceDisplayType
  displayUnitListPrice: DisplayUnitListPriceType
}

type UnitPriceDisplayType = 'always' | 'default'

type DisplayUnitListPriceType = 'showWhenDifferent' | 'notShow'

const UnitPrice: StorefrontFunctionComponent<UnitPriceProps> = ({
  textAlign,
  unitPriceDisplay = 'default',
  displayUnitListPrice = 'notShow',
}) => {
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return null
  }

  return (item.quantity > 1 || unitPriceDisplay === 'always')
  && item.price && item.price > 0 ? (
    <div
      id={`unit-price-${item.id}`}
      className={`t-mini c-muted-1 lh-title ${handles.unitPriceContainer} ${
        styles.quantity
      } ${opaque(item.availability)} ${parseTextAlign(textAlign)}`}
    >
      {item.listPrice &&
        item.price !== item.listPrice &&
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
              <FormattedCurrency value={item.price / 100} />
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
