import React, { FunctionComponent } from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import { IconDelete } from 'vtex.styleguide'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

import styles from './styles.css'

const DesktopContainer: FunctionComponent = () => {
  const { item, onRemove } = useItemContext()

  return (
    <div className="flex-auto">
      <div className={`flex-auto flex-m ${opaque(item.availability)}`}>
        {/* Price */}
        <div
          className={`${styles.price} mt5 mt0-ns flex-m items-center-m tr-m flex-none-m ml5-m`}
        >
          <div className="flex-auto">
            {item.listPrice !== item.price && (
              <div className="c-muted-1 strike t-mini mb2">
                <FormattedCurrency
                  value={(item.listPrice * item.quantity) / 100}
                />
              </div>
            )}
            <div className="div fw6 fw5-m">
              <FormattedCurrency
                value={(item.sellingPrice * item.quantity) / 100}
              />
            </div>
          </div>
        </div>

        {/* Remove - Desktop */}
        <div
          className={`${styles.remove} flex-m items-center-m flex-none-m dn db-m`}
        >
          <div className="flex-auto">
            <button
              className="pointer bg-transparent bn pa2 ml6"
              onClick={onRemove}
            >
              <IconDelete color="#727273" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopContainer
