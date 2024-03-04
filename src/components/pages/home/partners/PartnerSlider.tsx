import styles from './PartnerSlider.module.scss'
import { PartnerType } from '@/lib/graphql/queries'
import Image from 'next/image'
import cx from 'classnames'
import Slider from 'react-slick'
export interface IPartnerSlider {
  data: PartnerType[]
}

function PartnerSlider({ data }: IPartnerSlider) {
  return (
    <div className={'pb-5'}>
      <h1 className={'text-2xl font-semibold mb-3 mt-5'}>{'Tərəfdaşlar'}</h1>
      <Slider
        className={'mt-[50px]'}
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
        {data.map(img => (
          <Image
            key={img.attributes.image.data.id}
            src={
              process.env.SERVER_URL + img.attributes.image.data.attributes.url
            }
            alt={img.attributes.image.data.attributes.alternativeText}
            width={img.attributes.image.data.attributes.width}
            height={img.attributes.image.data.attributes.height}
            className={'max-h-[80px] object-contain'}
          />
        ))}
      </Slider>
    </div>
  )
}

export default PartnerSlider
