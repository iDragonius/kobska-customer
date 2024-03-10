import { initializeApollo } from '@/lib/graphql/apollo-client'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  BoardOfDirectorsQuery,
  IBoardOfDirectorsQuery
} from '@/lib/graphql/queries/board-of-directors.query'
import DirectorElement from '@/components/pages/about/boardOfDirector/director-element/DirectorElement'
import { useTranslation } from 'next-i18next'
import { LanguagesQueryEnum } from '@/config'
import Head from 'next/head'

export interface IBoardOfDirectors {
  data: IBoardOfDirectorsQuery
}
function BoardOfDirectorsPage({ data }: IBoardOfDirectors) {
  const { t } = useTranslation('about')
  return (
    <>
      <Head>
        <title>{t('board_of_directors')}</title>
      </Head>
      <h1 className='text-2xl font-semibold mb-5'>{t('board_of_directors')}</h1>
      <div className='flex flex-col text-center lg:flex-row '>
        <div className='grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3   gap-5 '>
          {data.boardOfDirector.data.attributes.directors.map(director => (
            <DirectorElement key={director.id} data={director} />
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: BoardOfDirectorsQuery,
    variables: {
      locale: LanguagesQueryEnum[locale as keyof typeof LanguagesQueryEnum]
    }
  })
  return {
    props: {
      data: res.data,
      ...(await serverSideTranslations(locale, ['about']))
    }
  }
}
export default BoardOfDirectorsPage
