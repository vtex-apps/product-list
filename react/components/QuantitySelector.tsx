import { range } from 'ramda'
import React, { FunctionComponent, useState, Fragment } from 'react'
import {
  defineMessages,
  InjectedIntl,
  InjectedIntlProps,
  injectIntl,
} from 'react-intl'
import { Dropdown, Input } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

const messages = defineMessages({
  remove: {
    defaultMessage: '',
    id: 'store/product-list.quantity-selector.remove',
  },
})

const MAX_INPUT_LENGTH = 5

enum SelectorType {
  Dropdown,
  Input,
}

interface Props {
  id: string
  value: number
  maxValue: number
  onChange: (value: number) => void
  disabled: boolean
}

const normalizeValue = (value: number, maxValue: number) =>
  value > maxValue ? maxValue : value

const validateValue = (value: string, maxValue: number) => {
  const parsedValue = parseInt(value, 10)

  if (isNaN(parsedValue)) {
    return 1
  }

  return normalizeValue(parseInt(value, 10), maxValue)
}

const validateDisplayValue = (value: string, maxValue: number) => {
  const parsedValue = parseInt(value, 10)

  if (isNaN(parsedValue) || parsedValue < 0) {
    return ''
  }

  return `${normalizeValue(parsedValue, maxValue)}`
}

const getDropdownOptions = (maxValue: number, intl: InjectedIntl) => {
  const limit = Math.min(9, maxValue)
  const options = [
    { value: 0, label: `0 - ${intl.formatMessage(messages.remove)}` },
    ...range(1, limit + 1).map(idx => ({ value: idx, label: `${idx}` })),
  ]

  if (maxValue >= 10) {
    options.push({ value: 10, label: '10+' })
  }

  return options
}

const CSS_HANDLES = [
  'quantityDropdownMobileContainer',
  'quantityDropdownContainer',
  'quantityInputMobileContainer',
  'quantityInputContainer',
] as const

const QuantitySelector: FunctionComponent<Props & InjectedIntlProps> = ({
  id,
  value,
  maxValue,
  onChange,
  disabled,
  intl,
}) => {
  const [curSelector, setSelector] = useState(
    value < 10 ? SelectorType.Dropdown : SelectorType.Input
  )
  const [activeInput, setActiveInput] = useState(false)

  const normalizedValue = normalizeValue(value, maxValue)

  const [curDisplayValue, setDisplayValue] = useState(`${normalizedValue}`)

  const handles = useCssHandles(CSS_HANDLES)

  const handleDropdownChange = (value: string) => {
    const validatedValue = validateValue(value, maxValue)
    const displayValue = validateDisplayValue(value, maxValue)

    if (validatedValue >= 10 && curSelector === SelectorType.Dropdown) {
      setSelector(SelectorType.Input)
    }

    setDisplayValue(displayValue)
    onChange(validatedValue)
  }

  const handleInputChange = (value: string) => {
    const displayValue = validateDisplayValue(value, maxValue)

    setDisplayValue(displayValue)
  }

  const handleInputBlur = () => {
    setActiveInput(false)
    if (curDisplayValue === '') {
      setDisplayValue('1')
    }

    const validatedValue = validateValue(curDisplayValue, maxValue)

    if (validatedValue < 10 && curSelector === SelectorType.Input) {
      setSelector(SelectorType.Dropdown)
    }

    onChange(validatedValue)
  }

  const handleInputFocus = () => setActiveInput(true)

  if (
    !activeInput &&
    normalizedValue !== validateValue(curDisplayValue, maxValue)
  ) {
    if (normalizedValue >= 10) {
      setSelector(SelectorType.Input)
    }
    setDisplayValue(validateDisplayValue(`${normalizedValue}`, maxValue))
  }

  if (curSelector === SelectorType.Dropdown) {
    const dropdownOptions = getDropdownOptions(maxValue, intl)

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
  } else {
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
          />
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(QuantitySelector)
