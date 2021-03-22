import type { Item } from 'vtex.checkout-graphql'

export const groupByUniqueId = <T extends { uniqueId: string }>(
  items: T[][],
  item: T
): T[][] => {
  const index = items.findIndex(([{ uniqueId }]) => uniqueId === item.uniqueId)

  if (index !== -1) {
    items.splice(index, 1, items[index].concat([item]))

    return items
  }

  return items.concat([[item]])
}

export type TotalItemsType =
  | 'total'
  | 'distinct'
  | 'totalAvailable'
  | 'distinctAvailable'

export const countCartItems = (countMode: TotalItemsType, items: Item[]) => {
  if (countMode === 'distinctAvailable') {
    return items
      .filter((item) => item.availability === 'available')
      .reduce<Item[][]>(groupByUniqueId, []).length
  }

  if (countMode === 'totalAvailable') {
    return items.reduce((itemQuantity: number, item: Item) => {
      if (item.availability === 'available') {
        return itemQuantity + item.quantity
      }

      return itemQuantity
    }, 0)
  }

  if (countMode === 'total') {
    return items.reduce((itemQuantity: number, item: Item) => {
      return itemQuantity + item.quantity
    }, 0)
  }

  // countMode === 'distinct'
  return items.reduce<Item[][]>(groupByUniqueId, []).length
}

export default { countCartItems, groupByUniqueId }
