import styles from './MoreInfo.module.scss'
import Link from 'next/link'
import ForwardLink from '@/assets/icons/forwardLink.svg'
import { useTranslation } from 'next-i18next'

export interface IMoreInfo {
  url: string
}

function MoreInfo({ url }: IMoreInfo) {
  const { t } = useTranslation('common')

  return (
    <div className={styles.wrapper}>
      <Link href={url} className={styles.link}>
        {t('moreInfo')}
      </Link>
      <ForwardLink className={styles.icon} />
    </div>
  )
}

export default MoreInfo
