import Image from 'next/image'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  HeadsAppealQuery,
  IHeadsAppealQuery
} from '@/lib/graphql/queries/heads-appeal.query'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'next-i18next'
import { LanguagesQueryEnum } from '@/config'
import React from 'react'
import Head from 'next/head'
export interface IHeadsAppealPage {
  data: IHeadsAppealQuery
}
const HeadsAppealPage = ({ data }: IHeadsAppealPage) => {
  const { t } = useTranslation('about')
  return (
    <>
      <Head>
        <title>{t('heads_appeal_page')}</title>
      </Head>
      <main>
        <h1 className={'text-2xl font-semibold mb-5'}>{t('heads_appeal')}</h1>
        <div className='bg-[#27749C] relative flex flex-col md:flex-row '>
          <div className='text-[#FFFFFF] font-[400] text-[16px] w-full md:w-1/2 max-w-screen-md p-10'>
            <ReactMarkdown
              className={'leading-[34px] text-[16px]  lg:text-[18px] font'}
              components={{
                h5: ({ node, ...props }) => <h5 className={'mb-5'} {...props} />
              }}
            >
              {data.headSAppeal.data.attributes.content}
            </ReactMarkdown>
            <p className='mt-5 font-bold leading-[34px] text-[20px]  lg:text-[25px] '>
              {data.headSAppeal.data.attributes.full_name}
            </p>
            <p className='lg:text-[16px] text-[12px]'>
              {data.headSAppeal.data.attributes.position}
            </p>
          </div>
          <div className='w-full md:w-1/2'>
            <Image
              src={
                process.env.SERVER_URL +
                data.headSAppeal.data.attributes.image.data.attributes.url
              }
              alt={
                data.headSAppeal.data.attributes.image.data.attributes
                  .alternativeText
              }
              width={
                data.headSAppeal.data.attributes.image.data.attributes.width
              }
              height={
                data.headSAppeal.data.attributes.image.data.attributes.height
              }
              className='block float-right md:absolute md:right-0 md:bottom-0 md:mt-0  w-[347px] h-[337px] lg:w-[532px] lg:h-[516px]'
            />
          </div>
        </div>
      </main>
    </>
  )
}
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: HeadsAppealQuery,
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
export default HeadsAppealPage
