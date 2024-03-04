import styles from './Opportunity.module.scss'
import { IHomeQuery, OpportunityElementProps } from '@/lib/graphql/queries'
import OpportunityBlock from '@/components/pages/home/opportunity/OpportunityBlock'
import { Space_Grotesk } from '@next/font/google'
import cx from 'classnames'
export interface IOpportunity {
  data: OpportunityElementProps[]
}
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
})
function Opportunity({ data }: IOpportunity) {
  return (
    <div
      className={
        'bg-mainOrange  w-full mb:py-[23px] mb:min-w-[154px] w-screen  relative right-[20px] sm:right-[30px] md:right-[40px]   mb:static mb:w-full'
      }
    >
      <div
        className={cx(
          'flex justify-evenly flex-col mb:flex-row',
          spaceGrotesk.className
        )}
      >
        {data.map(opp => (
          <OpportunityBlock key={opp.name} name={opp.name} value={opp.value} />
        ))}
      </div>
    </div>
  )
}

export default Opportunity
