import { initializeApollo } from '@/lib/graphql/apollo-client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { IMemberQuery, MembersQuery } from '@/lib/graphql/queries/members.query'
import MemberElement from '@/components/pages/membership/members/member-element/MemberElement'
import { LanguagesQueryEnum } from '@/config'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useLazyQuery } from '@apollo/client'
import { NewsQuery } from '@/lib/graphql/queries/news.query'
import { MembersBySectorQuery } from '@/lib/graphql/queries/members-by-sector.query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Drop from '@/assets/icons/mobile-menu.svg'
import cx from 'classnames'
export interface IMembersPage {
  data: IMemberQuery
}

function MembersPage({ data }: IMembersPage) {
  const { t } = useTranslation('membership')
  const [membersData] = useState(data.members)

  return (
    <>
      <Head>
        <title>{t('member')}</title>
      </Head>
      <main>
        <div
          className={
            'flex flex-col sm:flex-row sm:justify-between sm:items-center w-max sm:w-full  mb-5'
          }
        >
          <h1 className={'text-2xl font-semibold'}>{t('member')}</h1>
        </div>

        <div
          className={'grid grid-cols-1 sm:grid-cols-2  mb:grid-cols-3 gap-5'}
        >
          {membersData.data.map(el => {
            if (el.attributes.member_type?.data?.attributes?.type === 'Üzv')
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
export default MembersPage
