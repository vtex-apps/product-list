import 'react'

declare module 'react' {
  export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy'
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  export interface FunctionComponent<P = {}> extends FunctionComponent<P> {
    schema?: Record<string, unknown>
  }
}
