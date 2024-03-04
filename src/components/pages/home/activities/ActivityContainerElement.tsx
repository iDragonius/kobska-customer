import { ActivityProps } from '@/lib/graphql/queries'
import { divide } from 'lodash'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import styles from './ActivityContainerElement.module.scss'
import cx from 'classnames'
import Link from 'next/link'
export interface IActivityContainerElement {
  data: ActivityProps
  isBig: boolean
}

function ActivityContainerElement({ data, isBig }: IActivityContainerElement) {
  const { t } = useTranslation('common')
  const date = new Date(data?.attributes?.date)
  const { locale } = useRouter()
  return (
    <>
      {isBig ? (
        <Link
          href={`/our-activity/${data?.attributes.slug}`}
          className={styles.activity}
        >
          <Image
            src={
              process.env.SERVER_URL +
              (data?.attributes?.thumbnail?.data?.attributes?.url || '/')
            }
            alt={data?.attributes?.thumbnail?.data?.attributes.alternativeText}
            width={data?.attributes?.thumbnail?.data?.attributes.width || 200}
            height={data?.attributes?.thumbnail?.data?.attributes.height || 200}
            className={'w-full'}
          />
          <div className={styles.blockContent}>
            <h2 className={'text-[18px] font-medium mb-5'}>
              {data?.attributes?.title}
            </h2>
            <p className={styles.content}>
              {data?.attributes?.short_description}
            </p>
            <div className={'flex justify-between'}>
              <p
                className={
                  'text-[#454161] text-[12px] h-max leading-[12px] font-medium py-[5px] px-[10px] bg-[#F4F4F4] min-w-max w-max rounded-[2px]'
                }
              >
                {t(data?.attributes?.type)}
              </p>
              <p className={'text-[#A0A0A0] text-base font-medium'}>
                {dayjs(date)
                  .locale(locale as unknown as ILocale)
                  .format('DD MMMM YYYY')}
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href={`/our-activity/${data.attributes.slug}`}
          className={cx('flex flex-col mb:flex-row mb-5', styles.activity)}
        >
          <Image
            src={
              process.env.SERVER_URL +
              data?.attributes?.thumbnail?.data?.attributes?.url
            }
            alt={data?.attributes?.thumbnail?.data?.attributes?.alternativeText}
            width={240}
            height={240}
            className={'  w-full mb:min-w-[280px]'}
          />
          <div className={styles.blockContent}>
            <h2 className={'text-[18px] font-medium mb-5'}>
              {data?.attributes?.title}
            </h2>
            <p className={styles.content}>
              {data?.attributes?.short_description}
            </p>
            <div className={'flex justify-between'}>
              <p
                className={
                  'text-[#454161] h-max  text-[12px] leading-[12px] font-medium py-[5px] px-[10px] bg-[#F4F4F4] min-w-max w-max rounded-[2px]'
                }
              >
                {t(data?.attributes?.type)}
              </p>
              <p className={'text-[#A0A0A0] text-base font-medium'}>
                {dayjs(date)
                  .locale(locale as unknown as ILocale)
                  .format('DD MMMM YYYY')}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

export default ActivityContainerElement
