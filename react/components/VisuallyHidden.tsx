import type { FC } from 'react'
import React from 'react'

import styles from './VisuallyHidden.css'

const VisuallyHidden: FC = ({ children }) => {
  return <div className={styles.visuallyHidden}>{children}</div>
}

export default VisuallyHidden
