import type { FunctionComponent } from 'react'
import React from 'react'

export const Loading: FunctionComponent = () => <div />

export const useRuntime = jest.fn(() => ({
  rootPath: '',
}))
