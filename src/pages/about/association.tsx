import { Space_Grotesk } from '@next/font/google'

export interface IAssociation {
  data: IAboutAssociationQuery
}
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
})
import cx from 'classnames'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  AboutAssociationQuery,
  IAboutAssociationQuery
} from '@/lib/graphql/queries/about-association.query'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'next-i18next'
import { LanguagesQueryEnum } from '@/config'
import Head from 'next/head'
function Association({ data }: IAssociation) {
  const { t } = useTranslation('about')
  return (
    <>
      <Head>
        <title>{t('about_us_page')}</title>
      </Head>
      <main
        style={{
          backgroundImage: `url(${
            process.env.SERVER_URL +
            (data?.aboutAssociation?.data?.attributes?.background?.data?.attributes?.url || '/')
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        className={cx(
          'absolute left-0 right-0] w-full h-max -mt-[50px]',
          spaceGrotesk.className
        )}
      >
        <div className='bg-[#27749C] bg-opacity-50 w-full h-full pb-[50px] '>
          <div className=' xl:w-[1170px] xl:mx-auto mx-[20px] sm:mx-[30px] md:mx-[40px] mb-20'>
            <h1
              className={
                'text-2xl leading-[48px] text-[#FFFFFF] font-semibold ml-[50px] pt-[50px] pb-[30px]'
              }
            >
              {t('about_us')}
            </h1>
            <div className='bg-[#FFFFFF]  p-[50px]'>
              <ReactMarkdown
                components={{
                  h3: ({ node, ...props }) => (
                    <h3
                      className={'font-bold text-[#27749C] text-[24px]  mb-5'}
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className={
                        'mb-[50px] font-medium text-[18px] text-[#8C8C8C]'
                      }
                      {...props}
                    />
                  )
                }}
              >
                {data?.aboutAssociation?.data?.attributes?.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: AboutAssociationQuery,
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
export default Association
