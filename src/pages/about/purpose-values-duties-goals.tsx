import { initializeApollo } from '@/lib/graphql/apollo-client'
import { NewsQuery } from '@/lib/graphql/queries/news.query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Sections from '@/components/pages/about/purposeValuesDutiesGoals/sections/Sections'
import { useState } from 'react'
import Purpose from '@/components/pages/about/purposeValuesDutiesGoals/purpose/Purpose'
import Values from '@/components/pages/about/purposeValuesDutiesGoals/values/Values'
import {
  IPurposeValuesDutiesGoalsQuery,
  PurposeValuesDutiesGoalsQuery
} from '@/lib/graphql/queries/purpose-values-duties-goals'
import { LanguagesQueryEnum } from '@/config'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
export enum SectionsEnum {
  PURPOSE = 'purpose',
  VALUES = 'values'
}

export interface IPurposeValuesDutiesGoals {
  data: IPurposeValuesDutiesGoalsQuery
}
function PurposeValuesDutiesGoals({ data }: IPurposeValuesDutiesGoals) {
  const [active, setActive] = useState<SectionsEnum>(SectionsEnum.PURPOSE)
  const { t } = useTranslation('about')
  return (
    <>
      <Head>
        <title>{t('purpose_page')}</title>
      </Head>
      <Sections setActive={setActive} active={active} />
      {active === SectionsEnum.PURPOSE ? (
        <Purpose data={data.purposeValuesDutiesGoal.data.attributes.purpose} />
      ) : (
        <Values data={data.purposeValuesDutiesGoal.data.attributes.values} />
      )}
    </>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: PurposeValuesDutiesGoalsQuery,
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
export default PurposeValuesDutiesGoals
