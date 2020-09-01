import type { FunctionComponent } from 'react'
import React from 'react'

export const Loading: FunctionComponent = () => <div />

export const useRuntime = () => {
  let rootPath = ''
  const setRootPath = (rP: string) => {
    rootPath = rP
  }
  return { rootPath, setRootPath }
}
