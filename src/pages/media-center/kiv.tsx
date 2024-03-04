import Sections from '@/components/pages/media-center/kiv/sections/Sections'
import React, { useEffect, useState } from 'react'
import CompanyImages from '@/components/pages/media-center/kiv/company-images/CompanyImages'
import Branding from '@/components/pages/media-center/kiv/branding/Branding'
import VideoReels from '@/components/pages/media-center/kiv/video-reels/VideoReels'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { LanguagesQueryEnum } from '@/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  ComponentKivBrandingProps,
  ComponentKivImageProps,
  ComponentKivVideoClipProps,
  ComponentProps,
  IKivQuery,
  KivQuery,
  KivQueryEnum
} from '@/lib/graphql/queries/kiv.query'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export interface IKiv {
  data: IKivQuery
}

export enum KivEnums {
  VIDEO_REELS = 'video_reels',
  BRANDING = 'branding',
  COMPANY_IMAGES = 'company_images'
}
export interface IKivData {
  branding: ComponentProps[]
  images: ComponentProps[]
  videoClips: ComponentProps[]
}
function Kiv({ data }: IKiv) {
  const { t } = useTranslation('news')
  const [active, setActive] = useState(KivEnums.COMPANY_IMAGES)
  const [kivData, setKivData] = useState<IKivData>({
    branding: [],
    images: [],
    videoClips: []
  })
  useEffect(() => {
    setKivData({
      branding: data.kivs.data
        .filter(
          el =>
            el.attributes.attachment[0].__typename ===
            KivQueryEnum.ComponentKivBranding
        )
        .map(element => element.attributes.attachment[0]),
      images: data.kivs.data
        .filter(
          el =>
            el.attributes.attachment[0].__typename ===
            KivQueryEnum.ComponentKivImage
        )
        .map(element => element.attributes.attachment[0]),
      videoClips: data.kivs.data
        .filter(
          el =>
            el.attributes.attachment[0].__typename ===
            KivQueryEnum.ComponentKivVideoClip
        )
        .map(element => element.attributes.attachment[0])
    })
  }, [])
  return (
    <>
      <Head>
        <title>{t('kiv')}</title>
      </Head>
      <main>
        <Sections active={active} setActive={setActive} />
        {active === KivEnums.COMPANY_IMAGES && (
          <CompanyImages
            data={kivData.images as unknown as ComponentKivImageProps[]}
          />
        )}
        {active === KivEnums.BRANDING && (
          <Branding
            data={kivData.branding as unknown as ComponentKivBrandingProps[]}
          />
        )}
        {active === KivEnums.VIDEO_REELS && (
          <VideoReels
            data={kivData.videoClips as unknown as ComponentKivVideoClipProps[]}
          />
        )}
      </main>
    </>
  )
}
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: KivQuery,
    variables: {
      locale: LanguagesQueryEnum[locale as keyof typeof LanguagesQueryEnum]
    }
  })
  return {
    props: {
      data: res.data,
      ...(await serverSideTranslations(locale, ['news']))
    }
  }
}
export default Kiv
