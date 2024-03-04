import PrevArrow from '@/assets/icons/carousel-arrow.svg'
import NextArrow from '@/assets/icons/next-arrow.svg'
import { AssetsProps } from '@/lib/graphql/queries/news-by-slug.query'
import Image from 'next/image'
import Slider from 'react-slick'
import { useEffect, useRef, useState } from 'react'
import Close from '@/assets/icons/close.svg'
export interface ICustomSlider {
  data: AssetsProps[]
  title: string
}

function SliderArrows({
  className,
  to,
  onClick,
  currentSlide,
  slideCount
}: {
  className?: string
  to: 'next' | 'prev'
  onClick?: () => void
  currentSlide?: number
  slideCount?: number
}) {
  return (
    <button
      type='button'
      onClick={e => {
        if (onClick) onClick()

        e.stopPropagation()
      }}
      className={`button button--text button--icon ${className}`}
      aria-label={to}
    >
      {to === 'next' ? <NextArrow /> : <PrevArrow />}
    </button>
  )
}
type ImageType = {
  url: string
  alt: string
  width: number
  height: number
  mime: 'image' | 'video'
}

const ImageLightbox = ({
  data,
  closeModal,
  selectedSlide,
  title
}: {
  closeModal: () => void
  data: AssetsProps[]
  selectedSlide: {
    id: number
    mime: 'image' | 'video'
  }
  title: string
}) => {
  const lightboxRef = useRef<HTMLDivElement>(null)
  const slidesMaxIndex = data.length - 1
  const [selected, setSelected] = useState<number>(selectedSlide.id)
  const [currImg, setCurrImg] = useState<ImageType>({
    url: data[selected].attributes.url,
    alt: data[selected].attributes.alternativeText,
    width: data[selected].attributes.width,
    height: data[selected].attributes.height,
    mime: data[selected].attributes.mime.split('/')[0] as 'video' | 'image'
  })
  const changeSlide = (to: 'prev' | 'next') => {
    if (to === 'prev') {
      if (selected - 1 >= 0) {
        setCurrImg({
          url: data[selected - 1].attributes.url,
          alt: data[selected - 1].attributes.alternativeText,
          width: data[selected - 1].attributes.width,
          height: data[selected - 1].attributes.height,
          mime: data[selected - 1].attributes.mime.split('/')[0] as
            | 'video'
            | 'image'
        })
        setSelected(i => i - 1)
      }
    } else {
      if (selected + 1 <= slidesMaxIndex) {
        setCurrImg({
          url: data[selected + 1].attributes.url,
          alt: data[selected + 1].attributes.alternativeText,
          width: data[selected + 1].attributes.width,
          height: data[selected + 1].attributes.height,
          mime: data[selected + 1].attributes.mime.split('/')[0] as
            | 'video'
            | 'image'
        })
        setSelected(i => i + 1)
      }
    }
  }
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    if (lightboxRef.current != null) {
      lightboxRef.current?.focus()
    }
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])
  return (
    <div
      className={
        'fixed left-0 top-0 w-full h-full bg-black bg-opacity-40 z-[1200] flex items-center justify-center'
      }
      onClick={closeModal}
    >
      <div
        className={'flex items-center'}
        tabIndex={-1}
        ref={lightboxRef}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => {
          if (e.key === 'ArrowLeft') {
            changeSlide('prev')
          } else if (e.key === 'ArrowRight') {
            changeSlide('next')
          }
        }}
      >
        <div
          className={
            ' text-[60px]   select-none  sm:text-[80px] absolute left-1 sm:left-5 p-3 text-white  text-opacity-90 hover:text-opacity-100 transition-all ease-in-out  cursor-pointer'
          }
          onClick={() => {
            changeSlide('prev')
          }}
        >
          {'<'}
        </div>
        <div className={'flex flex-col '}>
          <Close
            onClick={closeModal}
            className={
              'stroke-[#fff] stroke-2 self-end opacity-60 hover:opacity-100 cursor-pointer'
            }
          />
          {currImg.mime === 'image' ? (
            <Image
              src={process.env.SERVER_URL + currImg.url}
              alt={currImg.alt}
              width={600}
              height={currImg.height}
            />
          ) : (
            <video
              src={process.env.SERVER_URL + currImg.url}
              autoPlay
              controls
              width={600}
            />
          )}

          <p className={'max-w-[600px] text-white font-medium'}>{title}</p>
        </div>

        <div
          className={
            'text-[60px] select-none  sm:text-[80px] absolute right-1 sm:right-5 p-3 text-white text-opacity-90 hover:text-opacity-100 transition-all ease-in-out cursor-pointer'
          }
          onClick={() => {
            changeSlide('next')
          }}
        >
          {'>'}
        </div>
      </div>
    </div>
  )
}
function CustomSlider({ data, title }: ICustomSlider) {
  const [initial, setInitial] = useState<{
    id: number
    mime: 'image' | 'video'
  }>({
    id: 0,
    mime: 'image'
  })
  const [active, setActive] = useState<boolean>(false)
  const closeModal = () => {
    setActive(false)
  }
  return (
    <>
      <Slider
        className={'mt-[50px] h-max mb:mx-6 customSlider '}
        slidesToShow={3}
        speed={500}
        swipe={true}
        infinite={false}
        slidesToScroll={3}
        adaptiveHeight={true}
        arrows={true}
        nextArrow={<SliderArrows to={'next'} />}
        prevArrow={<SliderArrows to={'prev'} />}
        responsive={[
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
            }
          }
        ]}
      >
        {data.map((img, i) => {
          if (img.attributes.mime.split('/')[0] === 'image') {
            return (
              <Image
                onClick={() => {
                  setActive(true)
                  setInitial({
                    id: i,
                    mime: 'image'
                  })
                }}
                key={img.attributes.url}
                src={process.env.SERVER_URL + img.attributes.url}
                alt={img.attributes.alternativeText}
                width={img.attributes.width}
                height={img.attributes.height}
                className={'max-w-[300px] object-cover'}
              />
            )
          } else {
            return (
              <video
                onClick={() => {
                  setActive(true)
                  setInitial({
                    id: i,
                    mime: 'video'
                  })
                }}
                src={process.env.SERVER_URL + img.attributes.url}
                key={img.attributes.url}
              />
            )
          }
        })}
      </Slider>
      {active && (
        <ImageLightbox
          selectedSlide={initial}
          data={data}
          closeModal={closeModal}
          title={title}
        />
      )}
    </>
  )
}

export default CustomSlider
