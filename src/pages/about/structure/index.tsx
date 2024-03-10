import React, { FC } from 'react'
import Head from 'next/head'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { BoardOfDirectorsQuery } from '@/lib/graphql/queries/board-of-directors.query'
import { LanguagesQueryEnum } from '@/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  IStructureQuery,
  StructureQuery
} from '@/lib/graphql/queries/structure.query'
import { GetServerSideProps } from 'next'
import DirectorElement from '@/components/pages/about/boardOfDirector/director-element/DirectorElement'
import StructureElement from '@/components/pages/about/structure/StructureElement'

export interface StructurePageProps {
  data: IStructureQuery
}

const StructurePage: FC<StructurePageProps> = ({ data }) => {
  console.log(data)
  return (
    <>
      <Head>
        <title>Struktur</title>
      </Head>
      <main>
        <h1 className='text-2xl font-semibold mb-5'>Struktur</h1>
        <div className='flex flex-col text-center lg:flex-row '>
          <div className='grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3   gap-5 '>
            {data.structure.data.attributes.members.map(director => (
              <StructureElement key={director.id} data={director} />
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
    query: StructureQuery,
    variables: {
      locale: LanguagesQueryEnum[ctx.locale as keyof typeof LanguagesQueryEnum],
      year: ctx.query.year ? +ctx.query.year : 2024
    }
  })
  return {
    props: {
      data: res.data,
      ...(await serverSideTranslations(ctx.locale || 'az-Cyrl-AZ', ['about']))
    }
  }
}
export default StructurePage
