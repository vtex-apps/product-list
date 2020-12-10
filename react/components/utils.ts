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

  const roundedValue = Math.max(
    (round ? Math.round : (n: number) => n)(parsedValue / unitMultiplier),
    minValue
  )

  return Math.min(roundedValue, maxValue ?? roundedValue)
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

  return Math.min(parsedValue, maxValue ?? parsedValue) * unitMultiplier
}
