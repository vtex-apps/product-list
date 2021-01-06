import { mergeableItems } from '../../__fixtures__/items'
import mergeItems from '../../utils/mergeItems'

describe('mergeItems', () => {
  it('should only merge items with same uniqueId', () => {
    const mergedItems = mergeItems(mergeableItems)
    expect(mergedItems[0].id).toBe('26')
    expect(mergedItems[1].id).toBe('26')
    expect(mergedItems[2].id).toBe('348')
    expect(mergedItems.length).toBe(3)
  })

  it('should sum quantities of items with same uniqueId', () => {
    const mergedItems = mergeItems(mergeableItems)
    expect(mergeableItems[2].quantity).toBe(2)
    expect(mergeableItems[3].quantity).toBe(1)
    expect(mergedItems[2].quantity).toBe(3)
  })

  it('should properly parse price tags', () => {})
})
