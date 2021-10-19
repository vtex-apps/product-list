import type { VFC } from 'react'
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['quantitySelectorIncreaseIcon'] as const

const IncreaseIcon: VFC = () => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <svg
      className={handles.quantitySelectorIncreaseIcon}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6666 6.88905H9.11103V1.3335H6.88881V6.88905H1.33325V9.11127H6.88881V14.6668H9.11103V9.11127H14.6666V6.88905Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default IncreaseIcon
