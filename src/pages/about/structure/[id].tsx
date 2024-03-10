import React, { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import MemberElement from '@/components/pages/membership/members/member-element/MemberElement'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import {
  IStructureQuery,
  StructureProps,
  StructureQuery
} from '@/lib/graphql/queries/structure.query'
import { LanguagesQueryEnum } from '@/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AllStructureQuery } from '@/lib/graphql/queries/all-structure.query'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import StructureElement from '@/components/pages/about/structure/StructureElement'

export interface StructureItemPageProps {
  data: IStructureQuery
}

const StructureItemPage: FC<StructureItemPageProps> = ({ data }) => {
  const { query } = useRouter()
  const [viewedStructure, setViewedStructure] = useState<StructureProps | null>(
    null
  )
  const [otherStructures, setOtherStructures] = useState<StructureProps[]>([])

  useEffect(() => {
    setViewedStructure(
      data.structure.data.attributes.members.find(
        member => String(member.id) === (query.id as string)
      ) || null
    )
    setOtherStructures(
      data.structure.data.attributes.members.filter(
        el =>
          el.id !==
          data.structure.data.attributes.members.find(
            member => String(member.id) === (query.id as string)
          )?.id
      )
    )
  }, [query.id])
  return (
    <>
      <Head>
        <title>{viewedStructure?.fullName}</title>
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
                  {viewedStructure && (
                    <Image
                      src={
                        process.env.SERVER_URL +
                        viewedStructure?.image.data.attributes.url
                      }
                      alt={viewedStructure?.fullName as string}
                      width={300}
                      height={300}
                      className={'w-full h-full object-contain'}
                    />
                  )}
                </div>
                <div className='w-full bg-loadingBg mt-5 flex items-center justify-center leading-6 text-white text-[16px] font-medium py-2'>
                  {viewedStructure?.position}
                </div>
                <div className={'flex gap-3 items-center mt-3'}>
                  {viewedStructure?.socialNetworks.map(socialNetwork => (
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
                  {viewedStructure?.fullName}
                </h1>
                <ReactMarkdown>
                  {viewedStructure?.description || ''}
                </ReactMarkdown>
                <div className={'mt-4 flex gap-7'}>
                  <div className={'font-semibold flex flex-col gap-1'}>
                    <p>{viewedStructure?.phoneNumber}</p>
                    <p>{viewedStructure?.email}</p>
                  </div>
                  <div className={'font-semibold'}>
                    <p>{viewedStructure?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'mt-[50px]'}>
          <h1 className={'text-2xl font-semibold mb-5'}>
            Digər struktur üzvləri
          </h1>
          <div
            className={'grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 gap-5'}
          >
            {otherStructures.map(structure => (
              <StructureElement data={structure} key={structure.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ctx => {
  const apolloClient = initializeApollo()

  const res = await apolloClient.query({
    query: AllStructureQuery,
    variables: {
      locale: LanguagesQueryEnum[ctx.locale as keyof typeof LanguagesQueryEnum]
    }
  })
  return {
    props: {
      data: res.data,
      ...(await serverSideTranslations(ctx.locale || 'az-Cyrl-AZ', ['about']))
    }
  }
}
export default StructureItemPage
