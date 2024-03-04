import styles from './Input.module.scss'
import { InputHTMLAttributes, LegacyRef, MutableRefObject } from 'react'
import cx from 'classnames'
import { Property } from 'csstype'
import Left = Property.Left
export interface IInput
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  type: 'text' | 'phone' | 'textarea'
}

function Input({ label, type, className, onChange, ...rest }: IInput) {
  const code = '+994'
  if (type === 'text') {
    return (
      <input
        type={'text'}
        placeholder={label}
        // name={name}
        className={cx(styles.textInput, className)}
        // onChange={onChange}
        {...rest}
      />
    )
  } else if (type === 'phone') {
    return (
      <div className={cx(styles.phoneBlock, className)}>
        <input
          type={'text'}
          maxLength={9}
          minLength={9}
          placeholder={label}
          // name={name}
          className={cx(styles.phoneInput)}
          onChange={onChange}
          {...rest}
        />
        <label className={styles.phoneLabel}>{code}</label>
      </div>
    )
  } else if (type === 'textarea') {
    return (
      <textarea
        placeholder={label}
        className={cx(styles.textareaInput, className)}
        // name={name}
        onChange={onChange}
      />
    )
  } else {
    return <></>
  }
}

export default Input
