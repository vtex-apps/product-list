import type { VFC } from 'react'
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['quantitySelectorDecreaseIcon'] as const

const DecreaseIcon: VFC = () => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <svg
      className={handles.quantitySelectorDecreaseIcon}
      width="16"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.333 9.334h13.334V7.11H1.333v2.223z" fill="currentColor" />
    </svg>
  )
}

export default DecreaseIcon
