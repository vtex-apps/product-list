import type { FunctionComponent } from 'react'
import React from 'react'

type FormattedCurrencyProps = {
  value: string | number
}

export const FormattedCurrency: FunctionComponent<FormattedCurrencyProps> = ({
  value,
}) => <div>{value}</div>
