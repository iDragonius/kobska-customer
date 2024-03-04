import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import {
  DirectionsByPathQuery,
  IDirectionsByPathQuery
} from '@/lib/graphql/queries/directions-by-path.query'
import { LanguagesQueryEnum } from '@/config'
import Image from 'next/image'
import DirectionAdvantageElement from '@/components/pages/direction/direction-advantage-element/DirectionAdvantageElement'

export interface IDirectionTypePage {
  data: IDirectionsByPathQuery
}

function DirectionTypePage({ data }: IDirectionTypePage) {
  const { t } = useTranslation('direction')

  return (
    <>
      <Head>
        <title>{data?.directionType?.data?.attributes?.name}</title>
      </Head>
      <main className={'-mt-[50px] pt-5 mb:pt-0'}>
        <div className={' w-screen relative left-[50%] ml-[-50vw] mb-[50px]'}>
          <Image
            src={
              process.env.SERVER_URL +
              data.directionType.data.attributes.cover.data.attributes.url
            }
            alt={
              data.directionType.data.attributes.cover.data.attributes
                .alternativeText
            }
            width={
              data.directionType.data.attributes.cover.data.attributes.width
            }
            height={
              data.directionType.data.attributes.cover.data.attributes.height
            }
            className={'max-h-[437px] min-h-[437px] w-full object-cover'}
          />
        </div>
        <div className={'mt-10'}>
          <p className={'text-[16px] sm:text-[18px] indent-[40px]'}>
            {data.directionType.data.attributes.description}
          </p>

          <div className={'mt-[50px]'}>
            <h1 className={'text-2xl font-semibold mb-5'}>{t('advantages')}</h1>
            <div className={'grid grid-cols-1 sm:grid-cols-2 gap-5'}>
              {data.directionType.data.attributes.advantages.map(adv => (
                <DirectionAdvantageElement
                  key={adv.id}
                  title={adv.title}
                  content={adv.content}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  const apolloClient = initializeApollo()

  const res = await apolloClient.query({
    query: DirectionsByPathQuery,
    variables: {
      locale:
        LanguagesQueryEnum[context.locale as keyof typeof LanguagesQueryEnum],
      path: `/${context.resolvedUrl.split('/')[2]}`
    }
  })
  if (!res.data.directionType.data) {
    return {
      redirect: {
        permanent: false,
        destination: '/directions'
      }
    }
  }
  return {
    props: {
      data: res.data,
      ...(await serverSideTranslations(context.locale || 'az', ['direction']))
    }
  }
}
export default DirectionTypePage
