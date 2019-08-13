import { range } from 'ramda'
import React, { FunctionComponent, useState } from 'react'
import { Dropdown, Input } from 'vtex.styleguide'

enum SelectorType {
  Dropdown,
  Input,
}

interface Props {
  value: number
  onChange: (value: number) => void
}

const validateValue = (value: string) => {
  const parsedValue = parseInt(value, 10)

  if (isNaN(parsedValue) || parsedValue === 0) {
    return 1
  }

  return parseInt(value, 10)
}

const validateDisplayValue = (value: string) => {
  const parsedValue = parseInt(value, 10)

  if (isNaN(parsedValue) || parsedValue < 1) {
    return ''
  }

  return `${parsedValue}`
}

const QuantitySelector: FunctionComponent<Props> = ({ value, onChange }) => {
  const [curSelector, setSelector] = useState(
    value < 10 ? SelectorType.Dropdown : SelectorType.Input
  )
  const [curDisplayValue, setDisplayValue] = useState(`${value}`)

  const handleChange = (value: string) => {
    const validatedValue = validateValue(value)
    const displayValue = validateDisplayValue(value)

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

  if (value !== validateValue(curDisplayValue)) {
    if (value >= 10) {
      setSelector(SelectorType.Input)
    }
    setDisplayValue(validateDisplayValue(`${value}`))
  }

  if (curSelector === SelectorType.Dropdown) {
    const dropdownOptions = [
      ...range(1, 10).map(idx => ({ value: idx, label: idx })),
      { value: 10, label: '10+' },
    ]

    return (
      <Dropdown
        options={dropdownOptions}
        size="small"
        value={value}
        onChange={(event: any) => handleChange(event.target.value)}
        placeholder=""
      />
    )
  } else {
    return (
      <Input
        size="small"
        value={curDisplayValue}
        onChange={(event: any) => handleChange(event.target.value)}
        onBlur={handleBlur}
        placeholder=""
      />
    )
  }
}

export default QuantitySelector
