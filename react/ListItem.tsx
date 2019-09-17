import React, { FunctionComponent } from 'react'

import DesktopContainer from './DesktopContainer'
import Image from './Image'

const ListItem: FunctionComponent = () => {
  return (
    <div className="flex">
      {/* Image */}
      <Image />

      {/* Desktop Container */}
      <DesktopContainer />
    </div>
  )
}

export default ListItem
