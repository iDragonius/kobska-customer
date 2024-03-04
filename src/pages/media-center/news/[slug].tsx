import React from 'react'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { LanguagesQueryEnum } from '@/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import {
  INewsBySlugQuery,
  NewsBySlugQuery
} from '@/lib/graphql/queries/news-by-slug.query'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import ReactMarkdown from 'react-markdown'
import NewsElement from '@/components/pages/media-center/news/news-element/NewsElement'
import Share from '@/components/ui/share/Share'
import CustomSlider from '@/components/ui/slider/CustomSlider'

export interface INews {
  data: INewsBySlugQuery
}
const News = ({ data }: INews) => {
  const { locale } = useRouter()
  const date = new Date(data.news.data.attributes.date)
  const { t } = useTranslation('news')
  return (
    <>
      <Head>
        <title>{data.news.data.attributes.title}</title>
      </Head>
      <main className={' '}>
        <div className={'flex mb-8  mb:mb-[90px]'}>
          <Share label={t('share')} />
          <div className={'  mb:max-w-[800px] mx-auto'}>
            <h1
              className={
                'text-[20px] mb:text-xl font-medium text-[#27749C] mb-3 sm:mb-5'
              }
            >
              {data.news.data.attributes.title}
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
              <p>{t(data.news.data.attributes.type)}</p>
            </div>
            <div className={'text-[#8C8C8C] text-[16px] mb:text-[18px] '}>
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => (
                    <h5
                      className={'indent-[20px] mb:indent-[50px] mb-4'}
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a className={'text-blue-500 '} {...props} />
                  )
                }}
              >
                {data.news.data.attributes.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        <div className={'w-full'}>
          {data.news.data.attributes.assets.data.length > 0 && (
            <CustomSlider
              title={data.news.data.attributes.title}
              data={data.news.data.attributes.assets.data}
            />
          )}
        </div>

        <div className={'mt-[50px]'}>
          <h1 className={'text-2xl font-semibold mb-5'}>{t('other_news')}</h1>
          <div
            className={'grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 gap-5'}
          >
            {data.newsM.data.map(el => (
              <NewsElement data={el} key={el.attributes.slug} />
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
    query: NewsBySlugQuery,
    variables: {
      locale:
        LanguagesQueryEnum[context.locale as keyof typeof LanguagesQueryEnum],
      slug: context.query.slug
    }
  })

  return {
    props: {
      data: { ...res.data },
      ...(await serverSideTranslations(context.locale || 'az', ['news']))
    }
  }
}
export default News
