export interface TextAlignProp {
  textAlign: 'left' | 'center' | 'right'
}

export const parseTextAlign = (prop: string) => {
  switch (prop) {
    case 'left':
      return 'tl'

    case 'center':
      return 'tc'

    case 'right':
      return 'tr'

    default:
      return ''
  }
}
