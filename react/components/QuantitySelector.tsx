import { range } from 'ramda'
import React, { FunctionComponent, useState } from 'react'
import { Dropdown, Input } from 'vtex.styleguide'

enum SelectorType {
  Dropdown,
  Input,
}

interface Props {
  value: number
  maxValue: number
  maxLength: number
  onChange: (value: number) => void
}

const normalizeValue = (value: number, maxValue: number) =>
  value > maxValue ? maxValue : value

const validateValue = (value: string, maxValue: number) => {
  const parsedValue = parseInt(value, 10)

  if (isNaN(parsedValue) || parsedValue === 0) {
    return 1
  }

  return normalizeValue(parseInt(value, 10), maxValue)
}

const validateDisplayValue = (value: string, maxValue: number) => {
  const parsedValue = parseInt(value, 10)

  if (isNaN(parsedValue) || parsedValue < 1) {
    return ''
  }

  return `${normalizeValue(parsedValue, maxValue)}`
}

const getDropdownOptions = (maxValue: number) => {
  const limit = Math.min(9, maxValue)
  const options = [
    ...range(1, limit + 1).map(idx => ({ value: idx, label: `${idx}` })),
  ]

  if (maxValue >= 10) {
    options.push({ value: 10, label: '10+' })
  }

  return options
}

const QuantitySelector: FunctionComponent<Props> = ({
  value,
  maxValue,
  maxLength,
  onChange,
}) => {
  const [curSelector, setSelector] = useState(
    value < 10 ? SelectorType.Dropdown : SelectorType.Input
  )

  const normalizedValue = normalizeValue(value, maxValue)

  const [curDisplayValue, setDisplayValue] = useState(`${normalizedValue}`)

  const handleChange = (value: string) => {
    const validatedValue = validateValue(value, maxValue)
    const displayValue = validateDisplayValue(value, maxValue)

    if (validatedValue >= 10 && curSelector === SelectorType.Dropdown) {
      setSelector(SelectorType.Input)
    }

    setDisplayValue(displayValue)
    onChange(validatedValue)
  }

  const handleBlur = () => {
    if (curDisplayValue === '') {
      setDisplayValue('1')
    }
  }

  if (normalizedValue !== validateValue(curDisplayValue, maxValue)) {
    if (normalizedValue >= 10) {
      setSelector(SelectorType.Input)
    }
    setDisplayValue(validateDisplayValue(`${normalizedValue}`, maxValue))
  }

  if (curSelector === SelectorType.Dropdown) {
    const dropdownOptions = getDropdownOptions(maxValue)

    return (
      <div>
        <div className="dn-l">
          <Dropdown
            options={dropdownOptions}
            size="small"
            value={normalizedValue}
            onChange={(event: any) => handleChange(event.target.value)}
            placeholder=""
          />
        </div>
        <div className="dn db-l">
          <Dropdown
            options={dropdownOptions}
            value={normalizedValue}
            onChange={(event: any) => handleChange(event.target.value)}
            placeholder=""
          />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="dn-l">
          <Input
            size="small"
            value={curDisplayValue}
            maxLength={maxLength}
            onChange={(event: any) => handleChange(event.target.value)}
            onBlur={handleBlur}
            placeholder=""
          />
        </div>
        <div className="dn db-l">
          <Input
            value={curDisplayValue}
            maxLength={maxLength}
            onChange={(event: any) => handleChange(event.target.value)}
            onBlur={handleBlur}
            placeholder=""
          />
        </div>
      </div>
    )
  }
}

export default QuantitySelector
