export const useCssHandles = (cssHandles: string[]) => {
  const handles: Record<string, string> = {}

  cssHandles.forEach((handle) => {
    handles[handle] = handle
  })

  return handles
}

const validateModifier = (modifier: string) => {
  if (typeof modifier !== 'string') {
    return false
  }

  /* This is not an error, so doesn't log any message, but should
   * invalidate the current modifier and not include it */
  if (modifier === '') {
    return false
  }

  if (/[^A-z0-9-]/.test(modifier)) {
    return false
  }

  return true
}

export const applyModifiers = (
  handles: string,
  modifier: string | string[]
) => {
  const normalizedModifiers =
    typeof modifier === 'string' ? [modifier] : modifier

  if (!Array.isArray(normalizedModifiers)) {
    console.error(
      'Invalid modifier type on `cssHandles.applyModifier`. Please use either a string or an array of strings'
    )

    return handles
  }

  const splitHandles = handles.split(' ')

  const modifiedHandles = normalizedModifiers
    .map((currentModifier) => {
      const isValid = validateModifier(currentModifier)

      if (!isValid) {
        return ''
      }

      return splitHandles
        .map((handle) => `${handle}--${currentModifier}`)
        .join(' ')
        .trim()
    })
    .filter((l) => l.length > 0)
    .join(' ')
    .trim()

  return splitHandles.concat(modifiedHandles).join(' ').trim()
}
