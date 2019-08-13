import React, { FunctionComponent } from 'react'
import { FormattedNumber } from 'react-intl'

const FormattedPrice: FunctionComponent<Props> = ({ value, currency }) => (
  <FormattedNumber currency={currency} style="currency" value={value / 100} />
)

interface Props {
  value: number
  currency: string
}

export default FormattedPrice
