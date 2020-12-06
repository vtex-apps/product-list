export const useCssHandles = (cssHandles: string[]) => {
  const handles: Record<string, string> = {}

  cssHandles.forEach((handle) => {
    handles[handle] = handle
  })

  return handles
}
