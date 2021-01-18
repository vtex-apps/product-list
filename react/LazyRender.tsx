import type { FunctionComponent } from 'react'
import React, { useRef, useState } from 'react'
import { useOnView } from 'vtex.on-view'

interface Props {
  height?: number
  offset?: number
  initializeOnInteraction?: boolean
}

const LazyRender: FunctionComponent<Props> = ({
  children,
  height = 400,
  offset = 300,
  initializeOnInteraction = false,
}) => {
  const ref = useRef(null)
  const [hasBeenViewed, setHasBeenViewed] = useState(false)

  const handleView = () => {
    setHasBeenViewed(true)
  }

  useOnView({
    ref,
    onView: handleView,
    once: true,
    initializeOnInteraction,
  })

  if (hasBeenViewed) {
    return <>{children}</>
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height,
      }}
    >
      <div
        ref={ref}
        style={{
          position: 'relative',
          width: '100%',
          top: -offset,
          height: '100%',
          paddingBottom: offset * 2,
          boxSizing: 'content-box',
        }}
      />
    </div>
  )
}

export default LazyRender
