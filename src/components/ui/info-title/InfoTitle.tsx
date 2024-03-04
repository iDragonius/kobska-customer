import styles from './InfoTitle.module.scss'
import MoreButton from '@/components/ui/more-button/MoreButton'
import cx from 'classnames'

export interface IInfoTitle {
  label: string
  buttonLabel: string
  url: string
  marginBottom: number
}

function InfoTitle({ label, buttonLabel, url, marginBottom }: IInfoTitle) {
  return (
    <div className={cx(styles.wrapper)} style={{ marginBottom }}>
      <h1 className={styles.title}>{label}</h1>
      <MoreButton label={buttonLabel} href={url} />
    </div>
  )
}

export default InfoTitle
