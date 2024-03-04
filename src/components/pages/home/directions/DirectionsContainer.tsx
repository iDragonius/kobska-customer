import { DirectionElementProps, ImageProps } from '@/lib/graphql/queries'
import DirectionContainerElement from '@/components/pages/home/directions/DirectionContainerElement'
import DirectionSlider from '@/components/pages/home/directions/DirectionSlider'
import MoreButton from '@/components/ui/more-button/MoreButton'
import { useTranslation } from 'next-i18next'

export interface IDirectionsContainer {
  directions: DirectionElementProps[]
  directionSliderImages: [
    {
      link: string
      image: {
        data: ImageProps
      }
      expiration_date: string
    }
  ]
}

function DirectionsContainer({
  directions,
  directionSliderImages
}: IDirectionsContainer) {
  const { t } = useTranslation('common')
  return (
    <div>
      <div className={'flex justify-between'}>
        <h1 className={'text-2xl font-semibold mb-5'}>{t('directions')}</h1>
        <MoreButton
          className={'hidden sm:flex'}
          label={t('allDirections')}
          href={'/directions'}
        />
      </div>
      <div className={'grid grid-cols-1 mb:grid-cols-2'}>
        <div className={'grid grid-cols-1 min-[500px]:grid-cols-2 gap-5'}>
          {directions.map(dr => (
            <DirectionContainerElement key={dr.id} data={dr} />
          ))}
        </div>
        <DirectionSlider images={directionSliderImages} />
      </div>
    </div>
  )
}

export default DirectionsContainer
