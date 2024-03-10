import React, { FC } from 'react'
import Head from 'next/head'
import NewsElement from '@/components/pages/media-center/news/news-element/NewsElement'
import { LogosQuery, LogosQueryProps } from '@/lib/graphql/queries/logos.query'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export interface LogoPageProps {
  data: LogosQueryProps
}

const LogoPage: FC<LogoPageProps> = ({ data }) => {
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
  const idFromUrl = (ctx.query.id as string)?.split('-').at(-1) as string
  const res = await apolloClient.query({
    query: LogosQuery,
    variables: {
      id: idFromUrl
    }
  })

  return {
    props: {
      data: { ...res.data },
      ...(await serverSideTranslations(ctx.locale || 'az', ['news']))
    }
  }
}
export default LogoPage
