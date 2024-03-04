import styles from './Dropdown.module.scss'
import { ReactNode, useState } from 'react'

interface IDropdown {
  children: ReactNode
}

function Dropdown({ children }: IDropdown) {
  return (
    <div className={styles.main}>
      <div>{children}</div>
    </div>
  )
}

export default Dropdown
