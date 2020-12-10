import { useContext, useCallback } from 'react'
import { ToastContext } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { parseValue, parseDisplayValue } from './utils'

const useQuantitySelectorState = ({
  maxValue,
  measurementUnit,
  minValue: propMinValue = 0,
}: {
  maxValue?: number
  minValue?: number
  measurementUnit?: string
}) => {
  const { showToast } = useContext(ToastContext)
  const intl = useIntl()

  const onChange = useCallback(
    ({
      value,
      unitMultiplier,
      displayUnitMultiplier = unitMultiplier,
      minValue = propMinValue,
    }: {
      value: string
      unitMultiplier: number
      displayUnitMultiplier?: number
      minValue?: number
    }) => {
      const validatedValue = parseValue({
        value,
        maxValue,
        unitMultiplier,
        minValue,
      })

      const rawParsedValue = parseValue({
        value,
        maxValue,
        unitMultiplier,
        minValue: 0,
        round: false,
      })

      const validatedDisplayValue = intl.formatNumber(
        parseDisplayValue({
          value: validatedValue.toString(),
          maxValue,
          unitMultiplier: displayUnitMultiplier,
        }),
        { useGrouping: false }
      )

      if (validatedValue !== rawParsedValue) {
        showToast(
          intl.formatMessage(
            {
              id: 'store/product-list.quantityUnitMultiplierMismatch',
            },
            {
              unitMultiplier: intl.formatNumber(unitMultiplier),
              measurementUnit,
              roundedValue: intl.formatNumber(validatedValue * unitMultiplier),
            }
          )
        )
      }

      return { validatedValue, validatedDisplayValue }
    },
    [intl, maxValue, propMinValue, measurementUnit, showToast]
  )

  return [onChange] as const
}

export default useQuantitySelectorState
