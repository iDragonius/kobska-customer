import { ActivityProps } from '@/lib/graphql/queries'
import ActivityContainerElement from '@/components/pages/home/activities/ActivityContainerElement'
import MoreButton from '@/components/ui/more-button/MoreButton'
import { useTranslation } from 'next-i18next'

export interface IActivitiesContainer {
  data: ActivityProps[]
}

function ActivitiesContainer({ data }: IActivitiesContainer) {
  const { t } = useTranslation('common')
  return (
    <div className={'mt-[50px]'}>
      <div className={'flex justify-between'}>
        <h1 className={'text-2xl font-semibold mb-5'}>{t('activities')}</h1>
        <MoreButton
          className={'hidden sm:flex'}
          label={t('view_all')}
          href={'/our-activity'}
        />
      </div>
      <div className={'sm:grid flex flex-col sm:grid-cols-2 gap-5'}>
        <ActivityContainerElement data={data[0]} isBig={true} />
        <div className={'contents mb:block'}>
          {data.slice(1).map(activity => (
            <ActivityContainerElement
              data={activity}
              key={activity.id}
              isBig={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActivitiesContainer
