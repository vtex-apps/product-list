export const normalizeValue = (value: number, maxValue?: number) => {
  return maxValue ? Math.min(value, maxValue) : value
}

export const parseValue = ({
  value,
  maxValue,
  minValue,
  unitMultiplier,
  round = true,
}: {
  value: string
  maxValue?: number
  minValue: number
  unitMultiplier: number
  round?: boolean
}) => {
  const parsedValue = parseFloat(value.replace(',', '.'))

  if (Number.isNaN(parsedValue)) {
    return 1
  }

  return normalizeValue(
    Math.max(
      (round ? Math.round : (n: number) => n)(parsedValue / unitMultiplier),
      minValue
    ),
    maxValue
  )
}

export const parseDisplayValue = ({
  value,
  maxValue,
  unitMultiplier,
}: {
  value: string
  maxValue?: number
  unitMultiplier: number
}) => {
  const parsedValue = parseFloat(value.replace(',', '.'))

  if (Number.isNaN(parsedValue) || parsedValue < 0) {
    return unitMultiplier
  }

  const normalizedValue = normalizeValue(parsedValue, maxValue) * unitMultiplier

  return normalizedValue
}
