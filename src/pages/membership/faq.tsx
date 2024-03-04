import FaqElement from '@/components/pages/membership/faq/faq-element/FaqElement'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaqQuery, IFaqQuery } from '@/lib/graphql/queries/faq.query'
import { useTranslation } from 'next-i18next'
import { LanguagesQueryEnum } from '@/config'
import Head from 'next/head'

export interface IFaq {
  data: IFaqQuery
}
function Faq({ data }: IFaq) {
  const { t } = useTranslation('membership')
  return (
    <>
      <Head>
        <title>{t('faq')}</title>
      </Head>
      <main
        className={
          'max-w-[800px] mx-auto p-8 border border-[#E5E7EB] rounded-[6px]'
        }
      >
        <h1
          className={
            'text-[#111827] text-2xl font-semibold border-b pb-3 border-b-[#E5E7EB]'
          }
        >
          {t('faq')}
        </h1>
        <div>
          {data.faq.data.attributes.questions.map(question => (
            <FaqElement data={question} key={question.id} />
          ))}
        </div>
      </main>
    </>
  )
}
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: FaqQuery,
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
export default Faq
