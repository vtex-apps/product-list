import { Item } from 'vtex.checkout-graphql'

import { ItemWithIndex } from '../ProductList'

type GroupedItems = {
  [key: string]: Item[]
}

const mergeItems = (arr: Item[]) => {
  const groupedItems: GroupedItems = arr
    .map((item, index) => ({ ...item, index })) // It should preserve it's index
    .reduce(
      // (obj, item) => ({ ...obj, [item.id]: [...(obj[item.id] ?? []), item] }), // Group by id (sku)
      (obj, item) => ({
        ...obj,
        [item.uniqueId]: [...(obj[item.uniqueId] ?? []), item],
      }), // Group by uniqueId: items with attachments have different uniqueId's
      {} as GroupedItems
    )

  const mergedItems = Object.keys(groupedItems).map(uniqueId =>
    Object.assign({}, ...groupedItems[uniqueId], {
      quantity: groupedItems[uniqueId].reduce(
        (res, item) => item.quantity + res,
        0
      ),
      priceTags: // Merge by identifier
    })
  )

  return groupedItems
}

// How to merge priceTags?

// How to merge items with attachments?
const shouldMerge = !item.attachmentOferings.length

export default mergeItems
