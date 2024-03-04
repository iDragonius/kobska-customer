import styles from './PartnersSlider.module.scss'
import SliderArrow from '@/assets/icons/carousel-arrow.svg'
import SliderItem from '@/components/ui/slider/SliderItem'
import PartnersSliderItem from '@/components/pages/home/partners/PartnersSliderItem'
import { ImageProps, PartnerType } from '@/lib/graphql/queries'

export interface IPartnersSlider {
  data: PartnerType[]
}

function PartnersSlider({ data }: IPartnersSlider) {
  const scrollR = () => {
    document.getElementById('slider')?.scrollBy(140, 0)
  }
  const scrollL = () => {
    document.getElementById('slider')?.scrollBy(-140, 0)
  }
  return (
    <div className={'flex items-center relative mt-[50px]'}>
      <SliderArrow
        className={'mr-10 w-max  absolute hidden mb:block'}
        onClick={scrollL}
      />
      <div
        className={
          'flex gap-4 mb:gap-[30px] mb:mx-10 overflow-x-auto mb:overflow-x-hidden  transition-all ease-in-out scroll-smooth '
        }
        id={'slider'}
      >
        {data.map(asset => (
          <PartnersSliderItem
            key={asset.attributes.image.data.attributes.url}
            data={asset.attributes.image.data.attributes}
          />
        ))}
      </div>
      <SliderArrow
        className={'ml-10 rotate-180 absolute right-0  hidden mb:block'}
        onClick={scrollR}
      />
    </div>
  )
}

export default PartnersSlider
