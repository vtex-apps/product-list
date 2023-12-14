import type { VFC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import Selector from './components/QuantitySelector'
import QuantityStepper from './components/QuantityStepper'
import { useItemContext } from './ItemContext'
import { AVAILABLE, CANNOT_BE_DELIVERED } from './constants/Availability'
import { opaque } from './utils/opaque'
import styles from './styles.css'
import { OrderForm } from 'vtex.order-manager'

const MAX_ITEM_QUANTITY = 99999
const CSS_HANDLES = ['quantitySelectorContainer'] as const

type QuantitySelectorMode = 'default' | 'stepper'
export type QuantitySelectorStepType = 'unitMultiplier' | 'singleUnit'

interface Props {
  mode?: QuantitySelectorMode
  quantitySelectorStep?: QuantitySelectorStepType
}

const enabledSelectorAvailability = [AVAILABLE, CANNOT_BE_DELIVERED]

function shouldDisableSelector(availability: string | null | undefined) {
  return !enabledSelectorAvailability.includes(availability ?? '')
}

const { useOrderForm } = OrderForm

const VIRTUAL_MAX_VALUE = 36
const DEFAULT_GIFT_TABLE_ID = 'default-gift-table-id'

const QuantitySelector: VFC<Props> = ({
  mode = 'default',
  quantitySelectorStep = 'unitMultiplier',
}) => {
  const { item, loading, onQuantityChange } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)
  const orderForm = useOrderForm()
  
  const mdr = orderForm?.orderForm?.customData?.customApps?.find((app: {id: string}) =>  app?.id === 'mdr')
  const numart = item.refId

  const [isVirtual, setIsVirtual] = useState(false) 
  const [physicalInventory, setPhysicalInventory] = useState(MAX_ITEM_QUANTITY) 
  const isTheFirstTime = useRef(true)
  const [maxValue, setMaxValue] = useState(MAX_ITEM_QUANTITY) 
  const [availability, setAvailability] = useState(AVAILABLE) 

  if (loading) {
    return <Loading />
  }

  useEffect(() => {
    const giftTableId = mdr?.fields?.giftTableId ?? DEFAULT_GIFT_TABLE_ID

    if(!numart || !isTheFirstTime.current) return

    const getIsVirtual = async () => {
      const res = await fetch(`/chapur/v1/sku-virtual/${giftTableId}/${numart}/${item.id}`)
      const data = await res.json()
      const virtual = data.virtual ?? false
      const physicalInventory = data.physicalInventory ?? 0

      setIsVirtual(virtual)
      setPhysicalInventory(data.physicalInventory)
      isTheFirstTime.current = false
    }

    getIsVirtual()
  }, [numart, mdr, item.id])

  useEffect(() => {
   setMaxValue(isVirtual && !!mdr ? VIRTUAL_MAX_VALUE : physicalInventory)
   setAvailability(isVirtual ? item.quantity === maxValue ? CANNOT_BE_DELIVERED : AVAILABLE : physicalInventory === 0 ? CANNOT_BE_DELIVERED  : AVAILABLE)
  }, [physicalInventory, isVirtual, mdr])

  const unitMultiplier =
    quantitySelectorStep === 'singleUnit' ? 1 : item.unitMultiplier ?? undefined
  
  const totalUnits = orderForm.orderForm.items
                      .filter((currentItem: { id: string }) => currentItem.id === item.id)
                      .reduce((accumulator: number, currentValue: { quantity: number }) => { 
                        return accumulator + currentValue.quantity
                      }, 0)


  if (mode === 'stepper') {
    return (
      <div
        className={classnames(
          opaque(availability),
          handles.quantitySelectorContainer,
          styles.quantity,
          styles.quantityStepper,
          applyModifiers(
            styles.quantitySelector,
            item.sellingPrice === 0 ? 'gift' : ''
          )
        )}
      >
        <QuantityStepper
          id={item.id}
          value={item.quantity}
          maxValue={maxValue}
          onChange={onQuantityChange}
          unitMultiplier={unitMultiplier}
          disabled={shouldDisableSelector(availability)}
          measurementUnit={item.measurementUnit ?? undefined}
          disabledAddUnitBtn={totalUnits >= maxValue}
        />
      </div>
    )
  }

  return (
    <div
      className={classnames(
        opaque(availability),
        handles.quantitySelectorContainer,
        styles.quantity,
        styles.quantitySelector,
        applyModifiers(
          styles.quantitySelector,
          item.sellingPrice === 0 ? 'gift' : ''
        )
      )}
    >
      <Selector
        id={item.id}
        value={item.quantity}
        maxValue={maxValue}
        onChange={onQuantityChange}
        disabled={shouldDisableSelector(availability)}
        unitMultiplier={unitMultiplier}
        measurementUnit={item.measurementUnit ?? undefined}
      />
    </div>
  )
}

export default QuantitySelector
