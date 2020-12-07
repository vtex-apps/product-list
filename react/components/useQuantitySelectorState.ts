import { useContext, useCallback } from 'react'
import { ToastContext } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { parseValue, parseDisplayValue } from './utils'

const useQuantitySelectorState = ({
  maxValue,
  measurementUnit,
  minValue = 0,
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
    }: {
      value: string
      unitMultiplier: number
      displayUnitMultiplier?: number
    }) => {
      const validatedValue = parseValue({
        value,
        maxValue,
        unitMultiplier,
        minValue,
      })

      const validatedDisplayValue = intl.formatNumber(
        parseDisplayValue({
          value: validatedValue.toString(),
          maxValue,
          unitMultiplier: displayUnitMultiplier,
        }),
        { useGrouping: false }
      )

      const validatedCurrentDisplayValue = intl.formatNumber(
        parseDisplayValue({
          value,
          maxValue,
          unitMultiplier: 1,
        }),
        { useGrouping: false }
      )

      if (validatedDisplayValue !== validatedCurrentDisplayValue) {
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
    [intl, maxValue, minValue, measurementUnit, showToast]
  )

  return [onChange] as const
}

export default useQuantitySelectorState
