import Pagination from '@/components/pages/media-center/news/pagiantion/Pagination'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { LanguagesQueryEnum } from '@/config'
import { INewsQuery, NewsQuery } from '@/lib/graphql/queries/news.query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import NewsElement from '@/components/pages/media-center/news/news-element/NewsElement'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import Head from 'next/head'
import { useLazyQuery } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { PaginationData } from '@/config/pagination.data'
export interface INewsPage {
  data: INewsQuery
}
const NewsPage = ({ data }: INewsPage) => {
  const [newsData, setNewsData] = useState<INewsQuery>(data)
  const { t } = useTranslation('news')
  const [getNews] = useLazyQuery(NewsQuery)

  return (
    <>
      <Head>
        <title>{t('news')}</title>
      </Head>
      <main>
        <h1 className={'font-semibold text-2xl  mb-5'}>{t('news')}</h1>
        <div className={'grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 gap-5'}>
          {newsData.newsM.data.map(newsElement => (
            <NewsElement key={newsElement.attributes.slug} data={newsElement} />
          ))}
        </div>
        <Pagination
          data={newsData.newsM.meta}
          setData={setNewsData}
          getData={getNews}
        />
      </main>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ctx => {
  const apolloClient = initializeApollo()

  const res = await apolloClient.query({
    query: NewsQuery,
    variables: {
      locale: LanguagesQueryEnum[ctx.locale as keyof typeof LanguagesQueryEnum],
      pageSize: ctx.query.pageSize
        ? +ctx.query.pageSize
        : PaginationData.pageSize,
      page: ctx.query.page ? +ctx.query.page : PaginationData.page
    }
  })

  return {
    props: {
      data: { ...res.data },
      ...(await serverSideTranslations(ctx.locale || 'az', ['news']))
    }
  }
}
export default NewsPage
