import type { VFC } from 'react'
import React, { useState, useEffect } from 'react'
import { FormattedMessage, useIntl, defineMessages } from 'react-intl'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

import VisuallyHidden from './VisuallyHidden'
import IncreaseIcon from './IncreaseIcon'
import DecreaseIcon from './DecreaseIcon'
import { parseDisplayValue } from './utils'
import useQuantitySelectorState from './useQuantitySelectorState'
import styles from './QuantityStepper.css'

const CSS_HANDLES = [
  'quantitySelectorWrapper',
  'quantitySelectorButton',
  'quantitySelectorDecrease',
  'quantitySelectorIncrease',
] as const

const messages = defineMessages({
  increaseQuantity: {
    id: 'store/product-list.quantityStepper.increaseQuantity',
  },
  decreaseQuantity: {
    id: 'store/product-list.quantityStepper.decreaseQuantity',
  },
})

interface Props {
  id?: string
  value?: number
  maxValue?: number
  onChange?: (value: number) => void
  disabled?: boolean
  unitMultiplier?: number
  measurementUnit?: string
}

const QuantityStepper: VFC<Props> = ({
  id,
  value = 1,
  maxValue,
  onChange,
  disabled,
  unitMultiplier = 1,
  measurementUnit = 'un',
}) => {
  const intl = useIntl()

  const normalizedValue = Math.min(value, maxValue ?? value)

  const [getUpdatedValue] = useQuantitySelectorState({
    maxValue,
    measurementUnit,
    minValue: 1,
  })

  const handles = useCssHandles(CSS_HANDLES)

  const [focused, setFocused] = useState(false)

  const [currentValue, setCurrentValue] = useState(
    intl.formatNumber(
      parseDisplayValue({
        value: normalizedValue.toString(),
        maxValue,
        unitMultiplier,
      }),
      { useGrouping: false }
    )
  )

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    evt
  ) => {
    setCurrentValue(evt.target.value)
  }

  const handleInputBlur = () => {
    const { validatedValue, validatedDisplayValue } = getUpdatedValue({
      value: currentValue,
      unitMultiplier,
    })

    onChange?.(validatedValue)

    setCurrentValue(validatedDisplayValue)
    setFocused(false)
  }

  const handleDecrease: React.MouseEventHandler = (evt) => {
    evt.preventDefault()

    const parsedValue = parseDisplayValue({
      value: normalizedValue.toString(),
      maxValue,
      unitMultiplier,
    })

    const { validatedValue, validatedDisplayValue } = getUpdatedValue({
      value: (parsedValue - unitMultiplier).toString(),
      unitMultiplier,
      minValue: 0,
    })

    onChange?.(validatedValue)
    setCurrentValue(validatedDisplayValue)
  }

  const handleIncrease: React.MouseEventHandler = (evt) => {
    evt.preventDefault()

    const parsedValue = parseDisplayValue({
      value: normalizedValue.toString(),
      maxValue,
      unitMultiplier,
    })

    const { validatedValue, validatedDisplayValue } = getUpdatedValue({
      value: (parsedValue + unitMultiplier).toString(),
      unitMultiplier,
    })

    onChange?.(validatedValue)
    setCurrentValue(validatedDisplayValue)
  }

  useEffect(() => {
    if (focused) {
      return
    }

    setCurrentValue(
      intl.formatNumber(
        parseDisplayValue({
          value: normalizedValue.toString(),
          maxValue,
          unitMultiplier,
        }),
        { useGrouping: false }
      )
    )
  }, [focused, intl, normalizedValue, maxValue, unitMultiplier])

  const uniqueId = id ? `product-list-quantity-stepper-${id}` : undefined

  return (
    <div className={`flex ${handles.quantitySelectorWrapper}`}>
      <button
        className={classnames(
          handles.quantitySelectorButton,
          handles.quantitySelectorDecrease,
          'pa4 ba br2 br--left flex items-center justify-center',
          {
            'c-muted-1 b--muted-4 hover-b--muted-3 bg-muted-5 hover-bg-muted-4 pointer': !disabled,
            'bg-muted-5 c-muted-3 b--muted-4': disabled,
          }
        )}
        aria-label={intl.formatMessage(messages.decreaseQuantity)}
        disabled={disabled}
        onClick={handleDecrease}
      >
        <DecreaseIcon />
      </button>
      <VisuallyHidden>
        <label htmlFor={uniqueId}>
          <FormattedMessage id="store/product-list.quantityStepper.label" />
        </label>
      </VisuallyHidden>
      <div
        className={classnames(
          styles.inputContainer,
          'flex-auto flex-shrink-0 flex items-center pv1 bt bb ph5',
          {
            'c-muted-3 b--muted-4': disabled,
            'b--muted-4 hover-b--muted-3': !disabled,
          }
        )}
      >
        <input
          className={classnames('flex-auto h-100 bn bg-transparent', {
            tc: measurementUnit === 'un',
            tr: measurementUnit !== 'un',
          })}
          id={uniqueId}
          disabled={disabled}
          value={currentValue}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={handleInputBlur}
        />
        {measurementUnit !== 'un' && (
          <span className="c-muted-1 ml3">{measurementUnit}</span>
        )}
      </div>
      <button
        className={classnames(
          handles.quantitySelectorButton,
          handles.quantitySelectorIncrease,
          'pa4 ba br2 br--right flex items-center justify-center',
          {
            'c-action-primary b--muted-4 hover-b--muted-3 bg-base hover-bg-muted-5 pointer': !disabled,
            'bg-muted-5 c-muted-3 b--muted-4': disabled,
          }
        )}
        aria-label={intl.formatMessage(messages.increaseQuantity)}
        disabled={disabled}
        onClick={handleIncrease}
      >
        <IncreaseIcon />
      </button>
    </div>
  )
}

export default QuantityStepper
