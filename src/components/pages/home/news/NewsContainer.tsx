import { NewsProps } from '@/lib/graphql/queries'
import NewsContainerElement from '@/components/pages/home/news/NewsContainerElement'
import { useTranslation } from 'next-i18next'
import Button from '@/components/ui/button/Button'
import MoreButton from '@/components/ui/more-button/MoreButton'

export interface INewsContainer {
  data: NewsProps[]
}

function NewsContainer({ data }: INewsContainer) {
  const { t } = useTranslation('common')
  return (
    <div className={'mt-[50px]'}>
      <div className={'flex justify-between'}>
        <h1 className={'text-2xl font-semibold mb-5'}>{t('news')}</h1>
        <MoreButton
          className={'hidden sm:flex'}
          label={t('view_all')}
          href={'/media-center/news'}
        />
      </div>
      <div className={'grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 gap-5'}>
        {data.map(news => (
          <NewsContainerElement key={news.id} data={news} />
        ))}
      </div>
    </div>
  )
}

export default NewsContainer
