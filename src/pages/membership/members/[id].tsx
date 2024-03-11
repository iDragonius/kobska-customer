import React, { FC } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { MemberProps, MembersQuery } from '@/lib/graphql/queries/members.query'
import { LanguagesQueryEnum } from '@/config'
import { locale } from 'dayjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  IMemberByIdQuery,
  MemberByIdQuery
} from '@/lib/graphql/queries/member-by-id.query'
import { useTranslation } from 'next-i18next'
import MemberElement from '@/components/pages/membership/members/member-element/MemberElement'
import Image from 'next/image'
import Link from 'next/link'
interface MemberPageProps {
  data: IMemberByIdQuery
}

const MemberPage: FC<MemberPageProps> = ({ data }) => {
  const { t } = useTranslation('membership')
  return (
    <>
      <Head>
        <title>{data.member.data.attributes.name}</title>
      </Head>
      <main>
        <div
          className={
            'bg-[#F4F4F4] -mt-[50px] w-screen relative left-[50%] ml-[-50vw] mb-[50px]'
          }
        >
          <div className='xl:w-[1170px] xl:mx-auto mx-[20px] sm:mx-[30px] md:mx-[40px] pt-[50px] pb-10'>
            <div className='flex items-center mb:items-start flex-col mb:flex-row gap-[26px]'>
              <div className='w-max'>
                <div className='w-[200px] min-[360px]:w-[278px] min-[360px]:h-[200px] bg-white border border-[##EEEEEE] flex items-center justify-center'>
                  <Image
                    src={
                      process.env.SERVER_URL +
                      data.member.data.attributes.logo.data.attributes.url
                    }
                    alt={
                      data.member.data.attributes.logo.data.attributes
                        .alternativeText
                    }
                    width={
                      data.member.data.attributes.logo.data.attributes.width
                    }
                    height={
                      data.member.data.attributes.logo.data.attributes.height
                    }
                    className='w-full h-full object-contain'
                  />
                </div>
                <div className='w-full bg-loadingBg mt-5 flex items-center justify-center leading-6 text-white text-[16px] font-medium py-2'>
                  {data.member.data.attributes.member_type.data.attributes.type}
                </div>
                <div className={'flex gap-3 items-center mt-3'}>
                  {data.member.data.attributes.links?.map(socialNetwork => (
                    <Link
                      href={socialNetwork.url}
                      key={socialNetwork.id}
                      className={
                        'w-6 h-6 rounded-full bg-loadingBg flex items-center justify-center'
                      }
                      target={'_blank'}
                    >
                      <Image
                        src={
                          process.env.SERVER_URL +
                          socialNetwork.icon.data.attributes.url
                        }
                        alt={socialNetwork.name}
                        width={14}
                        height={14}
                      />
                    </Link>
                  ))}
                </div>
              </div>
              <div className='ml-5'>
                <h1 className='font-semibold text-[20px] mb-5'>
                  {data.member.data.attributes.name}
                </h1>
                <p>{data.member.data.attributes.description}</p>
                <div className={'mt-4 flex gap-7'}>
                  <div className={'font-semibold flex flex-col gap-1'}>
                    <p>{data?.member.data.attributes.phoneNumber}</p>
                    <p>{data?.member.data.attributes.email}</p>
                  </div>
                  <div className={'font-semibold'}>
                    <p>{data?.member.data.attributes.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'mt-[50px]'}>
          <h1 className={'text-2xl font-semibold mb-5'}>
            {t('other_members')}
          </h1>
          <div
            className={'grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 gap-5'}
          >
            {data.members.data.map(el => (
              <MemberElement data={el} key={el.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const apolloClient = initializeApollo()
  const idFromUrl = (context.query.id as string)?.split('-').at(-1) as string

  const res = await apolloClient.query({
    query: MemberByIdQuery,
    variables: {
      locale:
        LanguagesQueryEnum[context.locale as keyof typeof LanguagesQueryEnum],
      id: idFromUrl
    }
  })

  return {
    props: {
      data: { ...res.data },
      ...(await serverSideTranslations(context.locale || 'az', ['membership']))
    }
  }
}

export default MemberPage
