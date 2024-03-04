import styles from './Purpose.module.scss'
import { AchievementType } from '@/lib/graphql/queries/purpose-values-duties-goals'
import { divide } from 'lodash'
import { useWindowSizeContext } from '@/context/providers/WindowSizeContextProvider'

export interface IPurpose {
  data: AchievementType[]
}

function Purpose({ data }: IPurpose) {
  const windowSize = useWindowSizeContext()

  return (
    <div className={'grid grid-cols-1 mb:grid-cols-2   gap-5 '}>
      {data.map(purpose => (
        <div key={purpose.id} className={'bg-[#D4E3EB] p-5 w-full '}>
          <h1 className={'text-xl font-medium mb-5'}>{purpose.name}</h1>
          <p className={'text-base'}> {purpose.content}</p>
        </div>
      ))}
    </div>
  )
}

export default Purpose
