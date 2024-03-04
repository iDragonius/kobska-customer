import MemberElement from '@/components/pages/membership/members/member-element/MemberElement'
import { LanguagesQueryEnum } from '@/config'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { IMemberQuery, MembersQuery } from '@/lib/graphql/queries/members.query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'

interface HonoraryMembersPageProps {
  data: IMemberQuery
}

const HonoraryMembersPage: FC<HonoraryMembersPageProps> = ({ data }) => {
  const { t } = useTranslation('membership')
  const [membersData] = useState(data.members)

  return (
    <>
      <Head>
        <title>{t('honorary_member')}</title>
      </Head>
      <main>
        <div
          className={
            'flex flex-col sm:flex-row sm:justify-between sm:items-center w-max sm:w-full  mb-5'
          }
        >
          <h1 className={'text-2xl font-semibold'}>{t('honorary_member')}</h1>
        </div>

        <div
          className={'grid grid-cols-1 sm:grid-cols-2  mb:grid-cols-3 gap-5'}
        >
          {membersData.data.map(el => {
            if (
              el.attributes.member_type?.data?.attributes?.type === 'Fəxri üzv'
            )
              return <MemberElement data={el} key={el.id} />
          })}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: MembersQuery,
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
export default HonoraryMembersPage
