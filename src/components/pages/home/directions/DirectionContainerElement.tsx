import styles from './DirectionContainerElement.module.scss'
import { DirectionElementProps } from '@/lib/graphql/queries'
import Link from 'next/link'
import cx from 'classnames'
import ForwardLink from '@/assets/icons/forwardLink.svg'
import { useTranslation } from 'next-i18next'

export interface IDirectionContainerElement {
  data: DirectionElementProps
}

function DirectionContainerElement({ data }: IDirectionContainerElement) {
  const { t } = useTranslation('common')
  return (
    <Link
      href={`/directions${data?.direction_type?.data?.attributes?.path}`}
      className={cx(styles.block)}
    >
      <h1 className={styles.title}>{data?.name}</h1>
      <p className={cx(styles.content)}>{data.short_description}</p>
      <div className={styles.linkWrapper}>
        <p className={styles.link}>{t('moreInfo')}</p>
        <ForwardLink className={styles.icon} />
      </div>
    </Link>
  )
}

export default DirectionContainerElement
