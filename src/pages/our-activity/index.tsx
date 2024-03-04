import { useTranslation } from 'next-i18next'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { LanguagesQueryEnum } from '@/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import {
  ActivitiesQuery,
  IActivitiesQuery
} from '@/lib/graphql/queries/activities.query'
import Pagination from '@/components/pages/media-center/news/pagiantion/Pagination'
import { useLazyQuery } from '@apollo/client'
import { useState } from 'react'
import ActivityElement from '@/components/pages/activity/ActivityElement'
import { PaginationData } from '@/config/pagination.data'
import { GetServerSideProps } from 'next'

export interface IOurActivityPage {
  data: IActivitiesQuery
}

function OurActivityPage({ data }: IOurActivityPage) {
  const { t } = useTranslation('activity')
  const [getActivities] = useLazyQuery(ActivitiesQuery)
  const [activitiesData, setActivitiesData] = useState<IActivitiesQuery>(data)
  return (
    <>
      <Head>
        <title>{t('activities')}</title>
      </Head>
      <main>
        <h1 className={'font-semibold text-2xl  mb-5'}>{t('activities')}</h1>
        <div className={'grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 gap-5'}>
          {activitiesData.activities.data.map(activity => (
            <ActivityElement key={activity.attributes.slug} data={activity} />
          ))}
        </div>
        <Pagination
          data={activitiesData.activities.meta}
          setData={setActivitiesData}
          getData={getActivities}
        />
      </main>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ctx => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: ActivitiesQuery,
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
      data: res.data,
      ...(await serverSideTranslations(ctx.locale || 'az', [
        'activity',
        'news'
      ]))
    }
  }
}
export default OurActivityPage
