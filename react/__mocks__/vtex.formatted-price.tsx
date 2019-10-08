import React, { FunctionComponent } from 'react'

interface Props {
  value: number
}

export const FormattedPrice: FunctionComponent<Props> = ({ value }) => (
  <div>{value}</div>
)
