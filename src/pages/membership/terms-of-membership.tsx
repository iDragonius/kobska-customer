import { useEffect, useState } from 'react'
import Sections from '@/components/pages/membership/termsOfMembership/sections/Sections'
import { SectionsEnum } from '@/pages/about/purpose-values-duties-goals'
import {
  ITermsOfMembershipQuery,
  TermsOfMembershipQuery
} from '@/lib/graphql/queries/terms-of-membership.query'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useWindowSize } from '@/hooks/useWindowSize'
import { LanguagesQueryEnum } from '@/config'
import Purpose from '@/components/pages/membership/termsOfMembership/purpose/Purpose'
import Values from '@/components/pages/membership/termsOfMembership/values/Values'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export interface ITermsOfMembership {
  data: ITermsOfMembershipQuery
}

function TermsOfMembership({ data }: ITermsOfMembership) {
  const [active, setActive] = useState<SectionsEnum>(SectionsEnum.PURPOSE)
  const { t } = useTranslation('membership')
  return (
    <>
      <Head>
        <title>{t('termsOfMembership_page')}</title>
      </Head>
      <main>
        <Sections setActive={setActive} active={active} />
        {active === SectionsEnum.PURPOSE ? (
          <Purpose data={data.termsOfMembership.data.attributes.purpose} />
        ) : (
          <Values data={data.termsOfMembership.data.attributes.values} />
        )}
      </main>
    </>
  )
}
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: TermsOfMembershipQuery,
    variables: {
      locale: LanguagesQueryEnum[locale as keyof typeof LanguagesQueryEnum]
    }
  })
  return {
    props: {
      data: res.data,
      ...(await serverSideTranslations(locale, ['membership']))
    }
  }
}
export default TermsOfMembership
