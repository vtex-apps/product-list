import React from 'react'
import classnames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { Tooltip, IconInfo } from 'vtex.styleguide'

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

interface UnitPriceMessageProps {
  unitPrice: number
  measurementUnit?: string | null
  unitMultiplier: number
  isApproximation?: boolean
}

const UnitPriceMessage: React.VFC<UnitPriceMessageProps> = ({
  unitPrice,
  measurementUnit,
  unitMultiplier,
  isApproximation = false,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  const unitPricePerUnit =
    unitMultiplier === 1 ? unitPrice : unitPrice / unitMultiplier

  return (
    <span style={{ textDecoration: 'inherit' }}>
      <FormattedMessage
        id="store/product-list.pricePerUnit"
        values={{
          isApproximation: isApproximation || unitMultiplier !== 1,
          price: (
            <span
              className={classnames(handles.unitPricePerUnitCurrency, 'dib')}
              style={{ textDecoration: 'inherit' }}
            >
              <FormattedCurrency value={unitPricePerUnit / 100} />
            </span>
          ),
          measurementUnit,
        }}
      />
    </span>
  )
}

const UnitPrice: React.FC<UnitPriceProps> = ({
  textAlign = 'left',
  unitPriceType = 'sellingPrice',
  unitPriceDisplay = 'default',
  displayUnitListPrice = 'notShow',
}) => {
  const { item: referenceItem, items, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)
  const isManualPriceDefined =
    referenceItem.sellingPrice === referenceItem.manualPrice &&
    referenceItem.sellingPrice !== referenceItem.price

  if (loading) {
    return null
  }

  const unitPrice = referenceItem[unitPriceType] ?? 0

  if (
    !(
      (referenceItem.quantity > 1 || unitPriceDisplay === 'always') &&
      unitPrice > 0 &&
      !isManualPriceDefined
    )
  ) {
    return null
  }

  const totalPrice = items.reduce(
    (total, item) => total + (item.sellingPrice ?? 0) * item.quantity,
    0
  )

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)

  const averageUnitPrice = Math.floor(totalPrice / totalQuantity)

  const isAveragePriceLower = averageUnitPrice < unitPrice

  return (
    <div
      id={`unit-price-${referenceItem.id}`}
      className={classnames(
        handles.unitPriceContainer,
        opaque(referenceItem.availability),
        parseTextAlign(textAlign),
        // kept for backwards compatibility
        styles.quantity,
        styles.unitPrice,
        't-mini c-muted-1 lh-title flex flex-column justify-center'
      )}
    >
      <div className={classnames({ strike: isAveragePriceLower })}>
        {!isAveragePriceLower &&
          referenceItem.listPrice &&
          unitPrice !== referenceItem.listPrice &&
          displayUnitListPrice === 'showWhenDifferent' && (
            <div className={`strike ${handles.unitListPrice}`}>
              <FormattedCurrency value={referenceItem.listPrice / 100} />
            </div>
          )}
        <UnitPriceMessage
          unitPrice={unitPrice}
          measurementUnit={referenceItem.measurementUnit}
          unitMultiplier={referenceItem.unitMultiplier ?? 1}
        />
      </div>

      {isAveragePriceLower && (
        <div className="flex items-center mt2">
          <UnitPriceMessage
            unitPrice={averageUnitPrice}
            measurementUnit={referenceItem.measurementUnit}
            unitMultiplier={referenceItem.unitMultiplier ?? 1}
            isApproximation
          />
          <Tooltip
            label={
              <>
                <p className="mv0 f7" style={{ lineHeight: '20px' }}>
                  <FormattedMessage id="store/product-list.priceDetails.title" />
                </p>

                <ul className="list ma0 pa0 f7" style={{ lineHeight: '20px' }}>
                  {items.map((item) => {
                    const multiplier = item.unitMultiplier ?? 1
                    const quantity = item.quantity * (item.unitMultiplier ?? 1)
                    const unit = item.measurementUnit ?? 'un.'

                    const sellingPrice = item.sellingPrice ?? 0
                    const isFree =
                      item.sellingPrice == null || item.sellingPrice === 0

                    const price =
                      multiplier !== 1
                        ? sellingPrice / multiplier
                        : sellingPrice

                    return (
                      <li key={item.sellingPrice}>
                        <span>
                          <FormattedMessage
                            id="store/product-list.priceDetails.details"
                            values={{
                              quantity,
                              unit,
                              price: <FormattedCurrency value={price / 100} />,
                              isFree,
                              isApproximation: multiplier !== 1,
                              // eslint-disable-next-line react/display-name
                              b: (chunks: any) => {
                                return <span className="b ttu">{chunks}</span>
                              },
                            }}
                          />
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </>
            }
          >
            <button
              className="c-action-primary bn bg-transparent pa0 ml3 flex items-center"
              type="button"
              aria-label="More information"
            >
              <IconInfo />
            </button>
          </Tooltip>
        </div>
      )}
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
