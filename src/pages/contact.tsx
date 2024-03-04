import Head from 'next/head'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
  ContactQuery,
  IContactQuery
} from '@/lib/graphql/queries/contact.query'
import { useState } from 'react'
import { LanguagesQueryEnum } from '@/config'

import Form from '@/components/pages/contact/Form'
import Success from '@/components/pages/contact/Success'

export interface IContact {
  data: IContactQuery
}

export default function ContactPage({ data }: IContact) {
  const [sent, setSent] = useState<boolean>(false)
  const { t } = useTranslation('contact')
  return (
    <>
      <Head>
        <title>{t('contact')}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main>
        {sent ? (
          <Success type={'contact'} />
        ) : (
          <Form data={data} setSent={setSent} />
        )}
      </main>
    </>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: ContactQuery,
    variables: {
      locale: LanguagesQueryEnum[locale as keyof typeof LanguagesQueryEnum]
    }
  })

  return {
    props: {
      data: res.data,
      ...(await serverSideTranslations(locale, ['contact']))
    }
  }
}
