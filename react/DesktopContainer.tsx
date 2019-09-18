import React, { FunctionComponent } from 'react'
import { IconDelete } from 'vtex.styleguide'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'

import styles from './styles.css'

const DesktopContainer: FunctionComponent = () => {
  const { item, onRemove } = useItemContext()

  return (
    <div className="flex-auto">
      <div className={`flex-auto flex-m ${opaque(item.availability)}`}>
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
