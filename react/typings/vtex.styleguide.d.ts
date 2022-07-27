/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType, Context } from 'react'

declare module 'vtex.styleguide' {
  interface InputProps {
    [key: string]: any
  }

  export const Button: ComponentType<any>
  export const Dropdown: ComponentType<any>
  export const IconDelete: ComponentType<any>
  export const Input: ComponentType<InputProps>
  export const InputCurrency: ComponentType<any>
  export const Link: ComponentType<any>
  export const Modal: ComponentType<any>
  export const Spinner: ComponentType<any>
  export const Tag: ComponentType<any>
  export const ToastContext: Context<{ showToast(message: string): void }>
}
