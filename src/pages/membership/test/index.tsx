import React, { FC } from 'react'
import Head from 'next/head'
import { Document, Page, pdfjs } from 'react-pdf'
// import workerSrc from '../../../../pdf-worker'

// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc
export interface TestPageProps {}

const TestPage: FC<TestPageProps> = () => {
  return (
    <>
      <Head>
        <title>TestPage</title>
      </Head>
      <main>
        {/*<Document*/}
        {/*  file={*/}
        {/*    'https://cpanel.kobska.az/uploads/kobska_teqdimat_2_24f3947b1a.pdf'*/}
        {/*  }*/}
        {/*>*/}
        {/*  <Page />*/}
        {/*</Document>*/}.
      </main>
    </>
  )
}

export default TestPage
