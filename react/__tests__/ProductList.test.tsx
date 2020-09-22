import React, { FunctionComponent } from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import { mockItems } from '../__mocks__/mockItems'
import AvailabilityMessage from '../AvailabilityMessage'
import Image from '../Image'
import Price from '../Price'
import ProductBrand from '../ProductBrand'
import ProductList from '../ProductList'
import ProductName from '../ProductName'
import ProductVariations from '../ProductVariations'
import QuantitySelector from '../QuantitySelector'
import RemoveButton from '../RemoveButton'
import UnitPrice from '../UnitPrice'

const ListItem: FunctionComponent = () => (
  <div>
    <AvailabilityMessage layout="cols" />
    <Image />
    <Price textAlign="left" />
    <ProductBrand />
    <ProductName />
    <ProductVariations />
    <QuantitySelector />
    <RemoveButton />
    <UnitPrice textAlign="left" />
  </div>
)

describe('Product List', () => {
  it('should display the list of products', () => {
    const { queryByText } = render(
      <ProductList
        items={mockItems}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={() => {}}
        renderOnView={false}
      >
        <ListItem />
      </ProductList>
    )

    expect(queryByText(mockItems[0].name as string)).toBeTruthy()
    expect(queryByText(mockItems[1].name as string)).toBeTruthy()
    expect(queryByText(mockItems[2].name as string)).toBeTruthy()
  })

  it('should call onRemove when remove button is clicked', () => {
    const mockHandleRemove = jest.fn((_: string) => {})

    const { getByTitle } = render(
      <ProductList
        items={[mockItems[2]]}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={mockHandleRemove}
        renderOnView={false}
      >
        <ListItem />
      </ProductList>
    )

    const removeButton = getByTitle('remove')
    fireEvent.click(removeButton)

    expect(mockHandleRemove).toHaveBeenCalledTimes(1)
    expect(mockHandleRemove.mock.calls[0][0]).toBe(mockItems[2].uniqueId)
  })

  it('should display unavailable items separately', () => {
    const { getByText } = render(
      <ProductList
        items={mockItems}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={() => {}}
        renderOnView={false}
      >
        <ListItem />
      </ProductList>
    )

    expect(getByText('2 unavailable products')).toBeTruthy()
    expect(getByText('1 available product')).toBeTruthy()
  })

  it('should display a message when item is out of stock', () => {
    const { queryByText } = render(
      <ProductList
        items={[mockItems[1]]}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={() => {}}
        renderOnView={false}
      >
        <ListItem />
      </ProductList>
    )

    expect(queryByText(/no longer available/)).toBeTruthy()
  })

  it('should display a message when item cannot be delivered', () => {
    const { queryByText } = render(
      <ProductList
        items={[mockItems[2]]}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={() => {}}
        renderOnView={false}
      >
        <ListItem />
      </ProductList>
    )

    expect(queryByText(/cannot be delivered/)).toBeTruthy()
  })
})
