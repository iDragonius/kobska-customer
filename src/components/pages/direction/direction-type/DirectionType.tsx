import styles from './DirectionType.module.scss'
import Link from 'next/link'
import cx from 'classnames'
import ForwardLink from '@/assets/icons/forwardLink.svg'
import { DirectionTypeProps } from '@/lib/graphql/queries/all-direction-types.query'
import { useTranslation } from 'next-i18next'

export interface IDirectionType {
  data: DirectionTypeProps
}

function DirectionType({ data }: IDirectionType) {
  const { t } = useTranslation('direction')
  return (
    <Link href={`/directions${data.path}`} className={cx(styles.block)}>
      <h1 className={styles.title}>{data.name}</h1>
      <p className={cx(styles.content)}>{data.description}</p>
      <div className={styles.linkWrapper}>
        <p className={styles.link}>{t('more_info')}</p>
        <ForwardLink className={styles.icon} />
      </div>
    </Link>
  )
}

export default DirectionType
