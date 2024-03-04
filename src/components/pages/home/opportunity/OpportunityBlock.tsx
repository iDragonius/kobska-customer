import styles from './Opportunity.module.scss'
import cx from 'classnames'
export interface IOpportunityBlock {
  name: string
  value: string
}

function OpportunityBlock({ name, value }: IOpportunityBlock) {
  return (
    <div
      className={cx(
        'text-white py-[19px] mb:py-0 pl-[45px] mb:first:pl-0 mb:border-l border-b border-b-white mb:border-b-0  mb:first:border-none '
      )}
    >
      <p className={'font-bold text-3xl'}>{value}</p>
      <p className={'font-normal text-2xl'}>{name}</p>
    </div>
  )
}

export default OpportunityBlock
