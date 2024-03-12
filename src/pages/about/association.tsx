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
import React, { useState } from 'react'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { Viewer, Worker } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
function Association({ data }: IAssociation) {
  const { t } = useTranslation('about')
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1) // start on first page
  const [loading, setLoading] = useState(true)
  const [pageWidth, setPageWidth] = useState(0)

  function onDocumentLoadSuccess({
    numPages: nextNumPages
  }: {
    numPages: number
  }) {
    setNumPages(nextNumPages)
  }

  function onPageLoadSuccess() {
    setPageWidth(window.innerWidth)
    setLoading(false)
  }

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/'
  }

  // Go to next page
  function goToNextPage() {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  }

  function goToPreviousPage() {
    setPageNumber(prevPageNumber => prevPageNumber - 1)
  }

  console.log(data)
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  return (
    <>
      <Head>
        <title>{t('about_us_page')}</title>
      </Head>
      <main
        style={{
          backgroundImage: `url(${
            process.env.SERVER_URL +
            (data?.aboutAssociation?.data?.attributes?.background?.data
              ?.attributes?.url || '/')
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

              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js'>
                <div
                  style={{
                    height: '750px',
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                >
                  <Viewer
                    fileUrl='/presentation.pdf'
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </div>
              </Worker>
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
