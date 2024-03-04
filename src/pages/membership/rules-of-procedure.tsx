import { initializeApollo } from '@/lib/graphql/apollo-client'
import { LanguagesQueryEnum } from '@/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  IRulesOfProcedureQuery,
  RulesOfProcedureQuery
} from '@/lib/graphql/queries/rules-of-procedure.query'
import styles from '@/styles/Rules.module.scss'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
export interface IRulesOfProcedure {
  data: IRulesOfProcedureQuery
}

function RulesOfProcedure({ data }: IRulesOfProcedure) {
  const { t } = useTranslation('membership')
  return (
    <>
      <Head>
        <title>{t('rulesOfProcedure_page')}</title>
      </Head>
      <main className={'-mt-[50px] pt-5 mb:pt-0 '}>
        <div
          className={
            'bg-[#27749C] w-screen relative left-[50%] ml-[-50vw] mb-[50px]'
          }
        >
          <div
            className={
              'xl:w-[1170px] xl:mx-auto mx-[20px] sm:mx-[30px] md:mx-[40px] py-8'
            }
          >
            <h1
              className={
                'text-2xl font-semibold text-white mb-5 leading-[36px]'
              }
            >
              {data.rulesOfProcedure.data.attributes.title}
            </h1>
            <p className={'text-[16px] font-medium text-white'}>
              {data.rulesOfProcedure.data.attributes.description}
            </p>
          </div>
        </div>
        <div className={'flex flex-wrap justify-between '}>
          {data.rulesOfProcedure.data.attributes.procedures.map(
            (procedure, i) => (
              <div
                key={procedure.id}
                className={
                  'flex flex-row mb:flex-col mb-[50px]  items-center w-full mb:w-[calc(25%-40px)]'
                }
              >
                <div
                  className={'relative mr-4 sm:mr-12 min-w-[56px] mb:mr-0 flex'}
                >
                  <span
                    className={
                      'opacity-10 text-[#2878A1] text-[46px]   mb:text-[78px]'
                    }
                  >
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </span>
                  <div
                    className={
                      ' w-[10px] h-[10px] mb:w-5 mb:h-5 rounded-full bg-[#27749C] absolute top-7 left-6   mb:top-12 mb:left-10 '
                    }
                    style={{}}
                  />
                </div>

                <div>
                  <h1
                    className={
                      'font-semibold text-[20px] text-left mb:text-center  mb-1'
                    }
                  >
                    {procedure.label}
                  </h1>
                  <p
                    className={
                      'text-left mb:text-center text-[#8C8C8C] text-base'
                    }
                  >
                    {procedure.content}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </>
  )
}
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: RulesOfProcedureQuery,
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
export default RulesOfProcedure
