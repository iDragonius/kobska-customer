import { useWindowSizeContext } from '@/context/providers/WindowSizeContextProvider'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { BoardOfDirectorsQuery } from '@/lib/graphql/queries/board-of-directors.query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  ISuccessesAndCertificatesQuery,
  SuccessesAndCertificatesQuery
} from '@/lib/graphql/queries/successes-and-certificates.query'
import SuccessElement from '@/components/pages/about/succcesses-and-certificates/success-element/SuccessElement'
import { useTranslation } from 'next-i18next'
import { LanguagesQueryEnum } from '@/config'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export interface ISuccessAndCertificates {
  data: ISuccessesAndCertificatesQuery
}

function SuccessesAndCertificates({ data }: ISuccessAndCertificates) {
  const { t } = useTranslation('about')

  return (
    <>
      <Head>
        <title>{t('successes_and_certificates')}</title>
      </Head>
      <main>
        <h1 className={'text-2xl font-semibold mb-5'}>
          {t('successes_and_certificates')}
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3   gap-5 '>
          {data.successesAndCertificates.data.map(el => (
            <SuccessElement key={el.id} data={el} />
          ))}
        </div>
      </main>
    </>
  )
}
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: SuccessesAndCertificatesQuery,
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
export default SuccessesAndCertificates
