import React, { FC } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { NewsQuery } from '@/lib/graphql/queries/news.query'
import { LanguagesQueryEnum } from '@/config'
import { PaginationData } from '@/config/pagination.data'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LogosQuery, LogosQueryProps } from '@/lib/graphql/queries/logos.query'
import NewsElement from '@/components/pages/media-center/news/news-element/NewsElement'

export interface LogosPageProps {
  data: LogosQueryProps
}

const LogosPage: FC<LogosPageProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <main>
        <div className={'grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 gap-5'}>
          {data.logo.data.attributes.news.data.map(el => (
            <NewsElement data={el} key={el.id} />
          ))}
        </div>
      </main>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ctx => {
  const apolloClient = initializeApollo()
  if (!ctx.query.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const res = await apolloClient.query({
    query: LogosQuery,
    variables: {
      id: ctx.query.id
    }
  })

  return {
    props: {
      data: { ...res.data },
      ...(await serverSideTranslations(ctx.locale || 'az', ['news']))
    }
  }
}
export default LogosPage
