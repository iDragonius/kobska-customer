import { ImageProps } from '@/lib/graphql/queries'
import Image from 'next/image'

import Slider from 'react-slick'
import Link from 'next/link'
import dayjs from 'dayjs'

export interface IDirectionSlider {
  images: [
    {
      link: string
      expiration_date: string
      image: {
        data: ImageProps
      }
    }
  ]
}

function DirectionSlider({ images }: IDirectionSlider) {
  const today = dayjs(new Date())
  return (
    <>
      <Slider
        className={'directionSlider mt-10 mb:mt-0 mb:ml-5 relative'}
        dots={true}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={3000}
        infinite={true}
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
        {images.map(img => {
          if (img.expiration_date) {
            if (today.isBefore(dayjs(img.expiration_date))) {
              return (
                <Link href={img.link} key={img.image.data.attributes.url}>
                  <Image
                    src={process.env.SERVER_URL + img.image.data.attributes.url}
                    alt={img.image.data.attributes.alternativeText}
                    width={img.image.data.attributes.width}
                    height={img.image.data.attributes.height}
                  />
                </Link>
              )
            }
          } else {
            return (
              <Link href={img.link} key={img.image.data.attributes.url}>
                <Image
                  src={process.env.SERVER_URL + img.image.data.attributes.url}
                  alt={img.image.data.attributes.alternativeText}
                  width={img.image.data.attributes.width}
                  height={img.image.data.attributes.height}
                />
              </Link>
            )
          }
        })}
      </Slider>
    </>
  )
}

export default DirectionSlider
