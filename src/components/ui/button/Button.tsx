import styles from './Button.module.scss'
import { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'outlined' | 'contact'
  label: string
}

function Button({ type, label, variant, className, ...rest }: IButton) {
  return (
    <button className={cx(styles.button, styles[variant], className)} {...rest}>
      {label}
    </button>
  )
}

export default Button
