import styles from './Values.module.scss'
import { AchievementType } from '@/lib/graphql/queries/purpose-values-duties-goals'
import { useWindowSizeContext } from '@/context/providers/WindowSizeContextProvider'

export interface IValues {
  data: AchievementType[]
}

function Values({ data }: IValues) {
  const windowSize = useWindowSizeContext()

  return (
    <div className={'grid grid-cols-1 mb:grid-cols-2   gap-5 '}>
      {data.map(value => (
        <div key={value.id} className={'bg-[#D4E3EB] p-5 w-full'}>
          <h1 className={'text-xl font-medium mb-5'}>{value.name}</h1>
          <p className={'text-base'}> {value.content}</p>
        </div>
      ))}
    </div>
  )
}

export default Values
