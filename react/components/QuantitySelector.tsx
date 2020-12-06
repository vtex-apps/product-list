import React, { useState, Fragment, FC, useEffect, useContext } from 'react'
import { defineMessages, useIntl, IntlShape } from 'react-intl'
import { Dropdown, Input, ToastContext } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

const range = (startValue: number, endNumber: number) => {
  const array = []

  for (let i = startValue; i < endNumber; i++) {
    array.push(i)
  }

  return array
}

const messages = defineMessages({
  remove: {
    defaultMessage: '',
    id: 'store/product-list.quantity-selector.remove',
  },
  label: { id: 'store/product-list.quantitySelector.label' },
  maxValueLabel: { id: 'store/product-list.quantitySelector.maxValueLabel' },
})

const MAX_DROPDOWN_VALUE = 10
const MAX_INPUT_LENGTH = 5

/* eslint-disable no-shadow */
const enum SelectorType {
  Dropdown = 'Dropdown',
  Input = 'Input',
}
/* eslint-enable no-shadow */

interface Props {
  id?: string
  value: number
  maxValue: number
  onChange: (value: number) => void
  disabled?: boolean
  unitMultiplier?: number
  measurementUnit?: string
}

const normalizeValue = (value: number, maxValue: number) => {
  const normalizedValue = value > maxValue ? maxValue : value

  return normalizedValue
}

const validateValue = (
  value: string,
  maxValue: number,
  unitMultiplier: number
) => {
  const parsedValue = parseFloat(value.replace(',', '.'))

  if (Number.isNaN(parsedValue)) {
    return 1
  }

  return normalizeValue(
    Math.max(Math.round(parsedValue / unitMultiplier), 1),
    maxValue
  )
}

const validateDisplayValue = (
  value: string,
  maxValue: number,
  unitMultiplier: number
) => {
  const parsedValue = parseFloat(value.replace(',', '.'))

  if (Number.isNaN(parsedValue) || parsedValue < 0) {
    return 1
  }

  const normalizedValue = normalizeValue(parsedValue, maxValue) * unitMultiplier

  return normalizedValue
}

const getDropdownOptions = ({
  maxValue,
  intl,
  unitMultiplier,
  measurementUnit,
}: {
  maxValue: number
  intl: IntlShape
  unitMultiplier: number
  measurementUnit?: string
}) => {
  const limit = Math.min(9, maxValue)
  const options = [
    { value: 0, label: `0 - ${intl.formatMessage(messages.remove)}` },
    ...range(1, limit + 1).map(idx => ({
      value: idx,
      label: intl.formatMessage(messages.label, {
        quantity: intl.formatNumber(idx * unitMultiplier),
        measurementUnit,
      }),
    })),
  ]

  if (maxValue >= MAX_DROPDOWN_VALUE) {
    options.push({
      value: MAX_DROPDOWN_VALUE,
      label: intl.formatMessage(messages.maxValueLabel, {
        quantity: intl.formatNumber(MAX_DROPDOWN_VALUE * unitMultiplier),
        measurementUnit,
      }),
    })
  }

  return options
}

const CSS_HANDLES = [
  'quantityDropdownMobileContainer',
  'quantityDropdownContainer',
  'quantityInputMobileContainer',
  'quantityInputContainer',
] as const

const QuantitySelector: FC<Props> = ({
  id,
  value,
  maxValue,
  onChange,
  disabled = false,
  unitMultiplier = 1,
  measurementUnit: itemMeasurementUnit,
}) => {
  const measurementUnit =
    itemMeasurementUnit && itemMeasurementUnit !== 'un'
      ? itemMeasurementUnit
      : undefined

  const intl = useIntl()

  const [curSelector, setSelector] = useState(
    value < MAX_DROPDOWN_VALUE ? SelectorType.Dropdown : SelectorType.Input
  )

  const [inputFocused, setInputFocused] = useState(false)

  const normalizedValue = normalizeValue(value, maxValue)

  const [curDisplayValue, setDisplayValue] = useState(
    intl.formatNumber(
      validateDisplayValue(
        normalizedValue.toString(),
        maxValue,
        unitMultiplier
      ),
      { useGrouping: false }
    )
  )

  const handles = useCssHandles(CSS_HANDLES)

  const handleDropdownChange = (inputValue: string) => {
    const validatedValue = validateValue(inputValue, maxValue, 1)

    const displayValue = intl.formatNumber(
      validateDisplayValue(inputValue, maxValue, unitMultiplier),
      { useGrouping: false }
    )

    if (validatedValue >= MAX_DROPDOWN_VALUE) {
      setSelector(SelectorType.Input)
    }

    setDisplayValue(displayValue)
    onChange(validatedValue)
  }

  const handleInputChange = (inputValue: string) => {
    setDisplayValue(inputValue)
  }

  const { showToast } = useContext(ToastContext)

  const handleInputBlur = () => {
    setInputFocused(false)

    if (curDisplayValue === '') {
      setDisplayValue(
        intl.formatNumber(validateDisplayValue('1', maxValue, unitMultiplier), {
          useGrouping: false,
        })
      )
    }

    const validatedValue = validateValue(
      curDisplayValue,
      maxValue,
      unitMultiplier
    )

    onChange(validatedValue)

    if (validatedValue < MAX_DROPDOWN_VALUE) {
      setSelector(SelectorType.Dropdown)

      return
    }

    const validatedDisplayValue = intl.formatNumber(
      validateDisplayValue(validatedValue.toString(), maxValue, unitMultiplier),
      { useGrouping: false }
    )

    const validatedCurrentDisplayValue = intl.formatNumber(
      validateDisplayValue(curDisplayValue, maxValue, 1),
      { useGrouping: false }
    )

    if (validatedDisplayValue !== validatedCurrentDisplayValue) {
      setDisplayValue(validatedDisplayValue)
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
  }

  const handleInputFocus = () => {
    setInputFocused(true)
  }

  useEffect(() => {
    if (inputFocused) {
      return
    }

    if (normalizedValue >= MAX_DROPDOWN_VALUE) {
      setSelector(SelectorType.Input)
    }

    setDisplayValue(
      intl.formatNumber(
        validateDisplayValue(`${normalizedValue}`, maxValue, unitMultiplier),
        { useGrouping: false }
      )
    )
  }, [
    inputFocused,
    maxValue,
    measurementUnit,
    unitMultiplier,
    normalizedValue,
    intl,
  ])

  if (curSelector === SelectorType.Dropdown) {
    const dropdownOptions = getDropdownOptions({
      maxValue,
      intl,
      unitMultiplier,
      measurementUnit,
    })

    return (
      <Fragment>
        <div className={`${handles.quantityDropdownMobileContainer} dn-m`}>
          <Dropdown
            id={`quantity-dropdown-mobile-${id}`}
            testId={`quantity-dropdown-mobile-${id}`}
            options={dropdownOptions}
            size="small"
            value={normalizedValue}
            onChange={(event: any) => handleDropdownChange(event.target.value)}
            placeholder=" "
            disabled={disabled}
          />
        </div>
        <div className={`${handles.quantityDropdownContainer} dn db-m`}>
          <Dropdown
            id={`quantity-dropdown-${id}`}
            testId={`quantity-dropdown-${id}`}
            options={dropdownOptions}
            value={normalizedValue}
            onChange={(event: any) => handleDropdownChange(event.target.value)}
            placeholder=" "
            disabled={disabled}
          />
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className={`${handles.quantityInputMobileContainer} dn-m`}>
        <Input
          id={`quantity-input-mobile-${id}`}
          size="small"
          value={curDisplayValue}
          maxLength={MAX_INPUT_LENGTH}
          onChange={(event: any) => handleInputChange(event.target.value)}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          placeholder=""
          disabled={disabled}
          suffix={measurementUnit}
        />
      </div>
      <div className={`${handles.quantityInputContainer} dn db-m`}>
        <Input
          id={`quantity-input-${id}`}
          value={curDisplayValue}
          maxLength={MAX_INPUT_LENGTH}
          onChange={(event: any) => handleInputChange(event.target.value)}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          placeholder=""
          disabled={disabled}
          suffix={measurementUnit}
        />
      </div>
    </Fragment>
  )
}

export default QuantitySelector
