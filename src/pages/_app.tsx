import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@/lib/graphql/apollo-client'
import { Poppins } from '@next/font/google'
import { Layout } from '@/components/layout/Layout'
import { appWithTranslation } from 'next-i18next'
import Providers from '@/context/providers/Providers'
import 'dayjs/locale/az'
import 'dayjs/locale/ru'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick-theme.css'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap'
})

function KobskaApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <Providers>
        <main className={`${poppins.variable} font-sans `}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </Providers>
    </ApolloProvider>
  )
}

export default appWithTranslation(KobskaApp)
