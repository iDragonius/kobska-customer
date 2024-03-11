import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { LanguagesQueryEnum } from '@/config'
import {
  ActivityBySlugQuery,
  IActivityBySlugQuery
} from '@/lib/graphql/queries/activity-by-slug.query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import CustomSlider from '@/components/ui/slider/CustomSlider'
import ReactMarkdown from 'react-markdown'
import dayjs from 'dayjs'
import Share from '@/components/ui/share/Share'
import ActivityElement from '@/components/pages/activity/ActivityElement'

export interface ActivityNewsItemPageProps {
  data: IActivityBySlugQuery
}

const ActivityNewsItemPage: FC<ActivityNewsItemPageProps> = ({ data }) => {
  const date = new Date(data.activity.data.attributes.date)
  const { t } = useTranslation('activity')
  const { locale } = useRouter()
  return (
    <>
      <Head>
        <title>{data.activity.data.attributes.title}</title>
      </Head>
      <main className={'relative '}>
        <div className={'flex mb-8  mb:mb-[90px]'}>
          <Share label={t('share')} />
          <div className={'  mb:max-w-[800px] mx-auto'}>
            <h1
              className={
                'text-[20px] mb:text-xl font-medium text-[#27749C] mb-3 sm:mb-5'
              }
            >
              {data.activity.data.attributes.title}
            </h1>
            <div
              className={
                'flex items-center text-base font-medium text-[#A0A0A0] mb-8'
              }
            >
              <p>
                {dayjs(date)
                  .locale(locale as unknown as ILocale)
                  .format('DD MMMM YYYY')}
              </p>
              <div
                className={
                  'w-[5px] h-[5px] rounded-full bg-[#A0A0A0] mx-[10px]'
                }
              />
              <p>{t(data.activity.data.attributes.type)}</p>
            </div>
            <div className={'text-[#8C8C8C] text-[16px] mb:text-[18px] '}>
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => (
                    <h5
                      className={'indent-[20px] mb:indent-[50px]'}
                      {...props}
                    />
                  )
                }}
              >
                {data.activity.data.attributes.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        {data.activity.data.attributes.assets.data.length > 0 && (
          <CustomSlider
            title={data.activity.data.attributes.title}
            data={data.activity.data.attributes.assets.data}
          />
        )}

        <div className={'mt-[50px]'}>
          <h1 className={'text-2xl font-semibold mb-5'}>
            {t('other_activities')}
          </h1>
          <div
            className={'grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 gap-5'}
          >
            {data.activities.data.map(el => (
              <ActivityElement data={el} key={el.attributes.slug} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: ActivityBySlugQuery,
    variables: {
      locale:
        LanguagesQueryEnum[context.locale as keyof typeof LanguagesQueryEnum],
      slug: context.query.slug
    }
  })

  return {
    props: {
      data: { ...res.data },
      ...(await serverSideTranslations(context.locale || 'az', ['activity']))
    }
  }
}
export default ActivityNewsItemPage
