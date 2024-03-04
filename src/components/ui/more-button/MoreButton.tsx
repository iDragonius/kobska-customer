import { ReactNode } from 'react'
import styles from './MoreButton.module.scss'
import Link from 'next/link'
import cx from 'classnames'
export interface IMoreButton {
  label: string
  href: string
  className?: string
}

function MoreButton({ label, href, className }: IMoreButton) {
  return (
    <Link href={href} className={cx(styles.button, className)}>
      {label}
    </Link>
  )
}

export default MoreButton
