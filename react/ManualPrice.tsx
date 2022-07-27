import type { FunctionComponent } from 'react'
import React, { Fragment, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormattedPrice } from 'vtex.formatted-price'
import { Button, ButtonPlain, InputCurrency, Modal, Tag } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

import { useItemContext } from './ItemContext'
import { getFormattedPrice } from './utils/price'

const ManualPrice: FunctionComponent = () => {
  const {
    item,
    itemIndex,
    shouldAllowManualPrice,
    onSetManualPrice,
  } = useItemContext()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [manualPrice, setManualPrice] = useState(item.manualPrice)
  const {
    culture: { currency, locale },
  } = useRuntime()

  const intl = useIntl()
  const priceChanged =
    item.sellingPrice === item.manualPrice && item.sellingPrice !== item.price

  const submitManualPrice = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (manualPrice != null && !Number.isNaN(manualPrice)) {
      onSetManualPrice(manualPrice, itemIndex)
    }

    setIsModalOpen(false)
  }

  const handleManualPriceChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newManualPrice = (evt.target.value as unknown) as number

    setManualPrice(Math.floor(newManualPrice * 100))
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setManualPrice(item.sellingPrice)
    setIsModalOpen(false)
  }

  const revertToOriginalPrice = () => {
    if (item.price != null) {
      onSetManualPrice(item.price, itemIndex)
      setManualPrice(item.price)
    }

    setIsModalOpen(false)
  }

  return (
    <Fragment>
      {shouldAllowManualPrice && (
        <div className="flex flex-column items-center mt3">
          {priceChanged ? (
            <div>
              <div className="flex-grow-0 tc mb2 c-muted-1">
                <FormattedPrice value={getFormattedPrice(item.manualPrice)} />
              </div>
              <div className="flex-grow-0 mb3 tc">
                <Tag size="small" bgColor="#3F3F40" className="fw5">
                  <FormattedMessage id="store/product-list.priceChanged" />
                </Tag>
              </div>
              <ButtonPlain size="small" onClick={handleOpenModal}>
                <FormattedMessage id="store/product-list.priceOptions" />
              </ButtonPlain>
            </div>
          ) : (
            <ButtonPlain size="small" onClick={handleOpenModal}>
              <FormattedMessage id="store/product-list.changePrice" />
            </ButtonPlain>
          )}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} className="w-25">
        <div className="flex flex-column">
          <span className="t-small mw9 mb1">
            <FormattedMessage id="store/product-list.originalPrice" />
          </span>
          <div className={`c-muted-1 mb3 ${priceChanged ? 'strike' : ''}`}>
            <FormattedPrice value={getFormattedPrice(item.price)} />
          </div>

          <label className="t-small mw9 mb2" htmlFor="manual-price-input">
            <FormattedMessage id="store/product-list.changeTo" />
          </label>
          <div className="flex flex-row flex-grow mb3">
            <div className="mr2">
              <InputCurrency
                id="manual-price-input"
                placeholder={intl.formatMessage({
                  id: 'store/product-list.manualPricePlaceholder',
                })}
                locale={locale}
                currencyCode={currency}
                value={getFormattedPrice(manualPrice)}
                onChange={handleManualPriceChange}
              />
            </div>

            <Button
              variation="secondary"
              size="regular"
              onClick={submitManualPrice}
            >
              <FormattedMessage id="store/product-list.applyManualPrice" />
            </Button>
          </div>

          {priceChanged && (
            <div>
              <ButtonPlain onClick={revertToOriginalPrice}>
                <FormattedMessage id="store/product-list.revertToOriginal" />
              </ButtonPlain>
            </div>
          )}
        </div>
      </Modal>
    </Fragment>
  )
}

export default ManualPrice
