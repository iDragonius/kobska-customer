import { GetServerSideProps } from 'next'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { LanguagesQueryEnum } from '@/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  AllDirectionTypesQuery,
  IAllDirectionTypesQuery
} from '@/lib/graphql/queries/all-direction-types.query'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import DirectionType from '@/components/pages/direction/direction-type/DirectionType'

export interface IDirectionsPage {
  data: IAllDirectionTypesQuery
}

function DirectionsPage({ data }: IDirectionsPage) {
  const { t } = useTranslation('direction')
  return (
    <>
      <Head>
        <title>{t('directions')}</title>
      </Head>
      <main>
        <div
          className={'grid grid-cols-1 sm:grid-cols-2  mb:grid-cols-4 gap-5'}
        >
          {data.directionTypes.data.map(el => (
            <DirectionType key={el.id} data={el.attributes} />
          ))}
        </div>
      </main>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: AllDirectionTypesQuery,
    variables: {
      locale:
        LanguagesQueryEnum[context.locale as keyof typeof LanguagesQueryEnum]
    }
  })
  return {
    props: {
      data: res.data,
      ...(await serverSideTranslations(context.locale || 'az', ['direction']))
    }
  }
}
export default DirectionsPage
