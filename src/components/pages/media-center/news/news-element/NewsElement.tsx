import { NewsQueryElementType } from '@/lib/graphql/queries/news.query'
import dayjs from 'dayjs'
import Image from 'next/image'
import styles from './NewsElement.module.scss'

import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface INewsElement {
  data: NewsQueryElementType
}
const NewsElement = ({ data }: INewsElement) => {
  const serverLink = process.env.SERVER_URL
  const date = new Date(data.attributes.date)
  const { locale } = useRouter()
  const { t } = useTranslation('news')
  return (
    <Link
      className={styles.newsBlock}
      href={`/media-center/news/${data.attributes.slug}`}
    >
      <div
        className={
          'h-[283px]  w-full border flex items-center justify-center p-1'
        }
      >
        <Image
          src={serverLink + data.attributes.thumbnail.data.attributes.url}
          height={1200}
          width={1200}
          alt={data.attributes.thumbnail.data.attributes.alternativeText}
          className={' max-h-[283px] h-full  object-contain '}
        />
      </div>
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

export default NewsElement
