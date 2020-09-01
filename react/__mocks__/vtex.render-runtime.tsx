import type { FunctionComponent } from 'react'
import React, { useState } from 'react'

export const Loading: FunctionComponent = () => <div />

export const useRuntime = () => {
  const [rootPath, setRootPath] = useState('')
  return rootPath
}
