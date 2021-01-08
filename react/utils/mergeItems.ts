import { Item } from 'vtex.checkout-graphql'

type GroupedItems = {
  [key: string]: Item[]
}

const mergeItems = (arr: Item[]) => {
  const groupedItems: GroupedItems = arr
    .map((item, index) => ({ ...item, index })) // It should preserve it's index as a property
    .reduce(
      (obj, item) => ({
        ...obj,
        [item.uniqueId]: [...(obj[item.uniqueId] ?? []), item],
      }), // Group by uniqueId: items with attachments have different uniqueId's
      {} as GroupedItems
    )

  const mergedItems = Object.keys(groupedItems).map(uniqueId =>
    Object.assign(
      {},
      ...groupedItems[uniqueId],
      groupedItems[uniqueId].reduce(
        (mergedItem, item) => ({
          quantity: mergedItem.quantity + item.quantity,
        }),
        {
          quantity: 0,
        }
      )
      // priceTags: groupedItems[uniqueId].reduce((tags, tag) => , []) // Merge by identifier
      // sellingPrice: // Sum all (sellingPrice * quantity) and divide by totalQuantity
    )
  )

  return mergedItems
}

// How to merge priceTags?

// How to merge items with attachments?

export default mergeItems
