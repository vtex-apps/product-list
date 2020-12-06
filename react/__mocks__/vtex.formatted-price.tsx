import type { FunctionComponent } from 'react'
import React from 'react'

interface Props {
  value: number
}

export const FormattedPrice: FunctionComponent<Props> = ({ value }) => (
  <div>{value}</div>
)
