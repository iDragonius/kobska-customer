import Head from 'next/head'
import { HomeQuery, IHomeQuery } from '@/lib/graphql/queries'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import Image from 'next/image'
import * as process from 'process'
import ReactMarkdown from 'react-markdown'
import { LanguagesQueryEnum } from '@/config'
import Opportunity from '@/components/pages/home/opportunity/Opportunity'
import MoreInfo from '@/components/ui/more-info-button/MoreInfo'
import NewsContainer from '@/components/pages/home/news/NewsContainer'
import ActivitiesContainer from '@/components/pages/home/activities/ActivitiesContainer'
import DirectionContainer from '@/components/pages/home/directions/DirectionsContainer'
import Video from '@/components/pages/home/video/Video'
import PartnerSlider from '@/components/pages/home/partners/PartnerSlider'
import Link from 'next/link'
import Slider from 'react-slick'
import MoreButton from '@/components/ui/more-button/MoreButton'
import NewsContainerElement from '@/components/pages/home/news/NewsContainerElement'
import slugify from 'slugify'
interface IHome {
  data: IHomeQuery
}
export default function Home({ data }: IHome) {
  const serverLink = process.env.SERVER_URL
  return (
    <>
      <Head>
        <title>KOBSKA</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={''}>
        <div className='absolute -z-10 left-0 top-0'>
          <div
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%)'
            }}
            className={
              'w-full h-[800px]  absolute top-0 left-0 z-[4] select-none'
            }
          />

          <Image
            src={`${serverLink}${data.homeInfo.data.attributes.main_background.data.attributes.url}`}
            alt={'test'}
            className={''}
            style={{ objectFit: 'cover', width: '100vw', height: '800px' }}
            width={
              data.homeInfo.data.attributes.main_background.data.attributes
                .width
            }
            height={300}
            priority={true}
          />
        </div>
        <div
          className={
            'min-h-[669px] mb:min-h-[612px] flex flex-col justify-between'
          }
        >
          <div className={'  max-w-max mb-[150px] mb:mb-0'}>
            <ReactMarkdown
              className={'text-white text-[20px] mb:text-[46px] font-medium '}
            >
              {data.homeInfo.data.attributes.main_title}
            </ReactMarkdown>

            <p
              className={
                'max-w-[800px] my-5 border-l-2 border-leftBorder text-[12px]  mb:text-md pl-[10px] text-[#F4F4F4]'
              }
            >
              {data.homeInfo.data.attributes.main_description}
            </p>
          </div>
          <Opportunity data={data.homeInfo.data.attributes.opportunities} />
        </div>
        <div className={' mt-5 mb:mt-[54px]'}>
          <DirectionContainer
            directions={data.homeInfo.data.attributes.directions}
            directionSliderImages={
              data.homeInfo.data.attributes.direction_slider
            }
          />
          <Video data={data.homeInfo.data} />
          {data.homeInfo.data.attributes.videos.length > 0 && (
            <div className={'mt-[50px]'}>
              <div className={'flex justify-between'}>
                <h1 className={'text-2xl font-semibold mb-5'}>Videolar</h1>
              </div>
              <Slider
                className={''}
                slidesToShow={
                  data.homeInfo.data.attributes.videos.length > 2
                    ? 3
                    : data.homeInfo.data.attributes.videos.length
                }
                slidesToScroll={1}
                autoplay={true}
                centerMode={false}
                autoplaySpeed={3000}
                infinite={true}
                responsive={[
                  {
                    breakpoint: 900,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      arrows: false
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      arrows: false
                    }
                  }
                ]}
              >
                {data.homeInfo.data.attributes.videos.map(video => (
                  <Link
                    href={video.link}
                    key={video.id}
                    className={'w-full'}
                    target={'_blank'}
                  >
                    <Image
                      src={
                        process.env.SERVER_URL + video.cover.data.attributes.url
                      }
                      alt={video.cover.data.attributes.name}
                      width={300}
                      height={300}
                      className={'w-full h-[283px] object-contain'}
                    />
                    <p className={'mt-1 text-gray-600 leading-5 text-center'}>
                      {video.name}
                    </p>
                  </Link>
                ))}
              </Slider>
            </div>
          )}

          <NewsContainer data={data.newsM.data} />
          <div className={'flex justify-between mt-[50px]'}>
            <h1 className={'text-2xl font-semibold mb-5'}>Layihələr</h1>
          </div>
          <Slider
            className={''}
            slidesToShow={4}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000}
            infinite={true}
            responsive={[
              {
                breakpoint: 900,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
                  arrows: false
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  arrows: false
                }
              }
            ]}
            // fade={true}
            appendDots={dots => (
              <ul style={{ margin: '0px', position: 'relative', top: '-50px' }}>
                {dots}
              </ul>
            )}
            customPaging={i => {
              return (
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    border: '1px solid white',
                    borderRadius: '100%'
                  }}
                />
              )
            }}
          >
            {data.logos.data.map(project => (
              <Link
                href={`/logos/${
                  slugify(project.attributes.name) + '-' + project.id
                }`}
                key={project.attributes.image.data.id}
              >
                <Image
                  src={
                    process.env.SERVER_URL +
                    project.attributes.image.data.attributes.url
                  }
                  alt={project.attributes.image.data.attributes.alternativeText}
                  width={project.attributes.image.data.attributes.width}
                  height={project.attributes.image.data.attributes.height}
                  className={' '}
                />
              </Link>
            ))}
          </Slider>
          <ActivitiesContainer data={data.activities.data} />
          <PartnerSlider data={data.partners.data} />
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: HomeQuery,
    variables: {
      locale: LanguagesQueryEnum[locale as keyof typeof LanguagesQueryEnum]
    }
  })

  return {
    props: {
      data: { ...res.data },
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}
