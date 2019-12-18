import React, { createContext, FC, useContext } from 'react'
import { Item } from 'vtex.checkout-graphql'

interface Context {
  item: Item
  loading: boolean
  onQuantityChange: (value: number) => void
  onRemove: () => void
}

interface ItemContextProviderProps {
  value: Context
}

const ItemContext = createContext<Context | undefined>(undefined)

export const ItemContextProvider: FC<ItemContextProviderProps> = ({
  value,
  children,
}) => <ItemContext.Provider value={value}>{children}</ItemContext.Provider>

export const useItemContext = () => {
  const context = useContext(ItemContext)
  if (context === undefined) {
    throw new Error('useItemContext must be used within a ItemContextProvider')
  }

  return context
}
