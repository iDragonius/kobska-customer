import Head from 'next/head'

import React from 'react'

import { GetServerSideProps } from 'next'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { LanguagesQueryEnum } from '@/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  ActivitiesByTypeAndYearQuery,
  ActivitiesByTypeQuery
} from '@/lib/graphql/queries/activities-by-type'
import { INewsQuery } from '@/lib/graphql/queries/news.query'
import NewsElement from '@/components/pages/media-center/news/news-element/NewsElement'
export interface IOurActivity {
  data: INewsQuery
}
function OurActivity({ data }: IOurActivity) {
  return (
    <>
      <Head>Fəaliyyətimiz</Head>
      <main className={'relative '}>
        <h1 className={'font-semibold text-2xl  mb-5'}>Xəbərlər</h1>
        <div className={'grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 gap-5'}>
          {data.newsM.data.map(newsElement => (
            <NewsElement key={newsElement.attributes.slug} data={newsElement} />
          ))}
        </div>
      </main>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  const apolloClient = initializeApollo()
  const res = context.query.year
    ? await apolloClient.query({
        query: ActivitiesByTypeAndYearQuery,
        variables: {
          locale:
            LanguagesQueryEnum[
              context.locale as keyof typeof LanguagesQueryEnum
            ],
          activity: context.query.slug,
          year: +context.query.year
        }
      })
    : await apolloClient.query({
        query: ActivitiesByTypeQuery,
        variables: {
          locale:
            LanguagesQueryEnum[
              context.locale as keyof typeof LanguagesQueryEnum
            ],
          activity: context.query.slug
        }
      })

  return {
    props: {
      data: { ...res.data },
      ...(await serverSideTranslations(context.locale || 'az', ['news']))
    }
  }
}
export default OurActivity
