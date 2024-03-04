import styles from './Checkbox.module.scss'
import { InputHTMLAttributes, useState } from 'react'
import cx from 'classnames'
export interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

function Checkbox({ label, className, onClick, ...rest }: ICheckbox) {
  return (
    <div className={cx(className, 'w-max')} onClick={onClick}>
      <input type={'checkbox'} {...rest} />
      <label className={'ml-2 text-base text=[#111827] font-medium'}>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
