import { NewsProps } from '@/lib/graphql/queries'
import Link from 'next/link'
import styles from '@/components/pages/media-center/news/news-element/NewsElement.module.scss'
import Image from 'next/image'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export interface INewsContainerElement {
  data: NewsProps
}

function NewsContainerElement({ data }: INewsContainerElement) {
  const serverLink = process.env.SERVER_URL
  const date = new Date(data.attributes.date)
  const { locale } = useRouter()
  const { t } = useTranslation('common')
  return (
    <Link
      className={styles.newsBlock}
      href={`/media-center/news/${data.attributes.slug}`}
    >
      <Image
        src={serverLink + data?.attributes?.thumbnail?.data?.attributes?.url}
        height={data?.attributes?.thumbnail?.data?.attributes?.height}
        width={data?.attributes?.thumbnail?.data?.attributes?.width}
        alt={data?.attributes?.thumbnail?.data?.attributes?.alternativeText}
        style={{ width: '100%', height: '283px', objectFit: 'fill' }}
      />
      <div className={styles.newsBlockContent}>
        <div>
          <h2 className={styles.newsBlockContentHeader}>
            {data.attributes.title}
          </h2>
          <p className={styles.content}>{data.attributes.short_description}</p>
        </div>

        <div className={styles.newsBlockContentWrapper}>
          <p className={styles.newsType}>{t(data.attributes.type)}</p>
          <p className={styles.date}>
            {dayjs(date)
              .locale(locale as unknown as ILocale)
              .format('DD MMMM YYYY')}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default NewsContainerElement
