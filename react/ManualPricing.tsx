import React, { FunctionComponent, Fragment, useState } from 'react'
import { FormattedPrice } from 'vtex.formatted-price'
import { Button, ButtonPlain, Input, Modal, Tag } from 'vtex.styleguide'

import { useItemContext } from './ItemContext'

const ManualPricing: FunctionComponent = () => {
  const { item } = useItemContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sellingPrice =
    item.sellingPrice != null
      ? (item.sellingPrice * item.quantity) / 100
      : item.sellingPrice
  const [manualPrice, setManualPrice] = useState(sellingPrice)
  const priceChanged = manualPrice !== sellingPrice

  const handleManualPriceChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newManualPrice = evt.target.value as unknown

    setManualPrice(newManualPrice as number)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Fragment>
      <div className="flex flex-column items-center mt3">
        <div className={`flex-grow-0 tc mb2 c-muted-1`}>
          <FormattedPrice value={manualPrice} />
        </div>

        {priceChanged ? (
          <div>
            <div className="flex-grow-0 mb3">
              <Tag size="small" bgColor="#3F3F40" className="fw5">
                Changed
              </Tag>
            </div>
            <ButtonPlain size="small" onClick={handleOpenModal}>
              Price options
            </ButtonPlain>
          </div>
        ) : (
          <ButtonPlain size="small" onClick={handleOpenModal}>
            Change price
          </ButtonPlain>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} className="w-5">
        <div className="flex flex-column">
          <span className="t-small mw9 mb1">Original price</span>
          <div className={`c-muted-1 mb3 ${priceChanged ? 'strike' : ''}`}>
            <FormattedPrice value={sellingPrice} />
          </div>

          <span className="t-small mw9 mb2">Change to</span>
          <div className="flex flex-row mb3">
            <div className="mr1">
              <Input
                type="number"
                value={manualPrice}
                onChange={handleManualPriceChange}
              />
            </div>

            <Button onClick={handleCloseModal}>ok</Button>
          </div>

          {priceChanged && (
            <div>
              <ButtonPlain onClick={() => setManualPrice(sellingPrice)}>
                Revert to original
              </ButtonPlain>
            </div>
          )}
        </div>
      </Modal>
    </Fragment>
  )
}

export default ManualPricing
