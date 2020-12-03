import { ComponentType, Context } from 'react'

declare module 'vtex.styleguide' {
  interface InputProps {
    [key: string]: any
  }

  export const Button: ComponentType<any>
  export const Dropdown: ComponentType<any>
  export const Input: ComponentType<InputProps>
  export const Link: ComponentType<any>
  export const Spinner: ComponentType<any>
  export const IconDelete: ComponentType<any>
  export const ToastContext: Context<{ showToast(message: string): void }>
}

declare module '@vtex/styleguide/lib/*' {
  const Component: ComponentType<any>
  export default Component
}

declare module '@vtex/styleguide/lib/ToastProvider' {
  export const ToastContext: Context<{ showToast(message: string): void }>
}
