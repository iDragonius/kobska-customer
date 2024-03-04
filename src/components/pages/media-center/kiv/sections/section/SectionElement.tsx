import { useTranslation } from 'next-i18next'
import cx from 'classnames'
export interface ISection {
  name: string
  active: string
  className?: string
  onClick?: () => void
}

function SectionElement({ name, active, className, onClick }: ISection) {
  const { t } = useTranslation('news')
  return (
    <div
      className={cx(
        'cursor-pointer text-[16px] leading-[20px] border min-w-max  rounded-[50px] flex justify-center px-10 py-[6.5px]',
        active === name
          ? 'border-[#27749C] bg-[#27749C] text-white'
          : 'border-black text-black',
        className
      )}
      onClick={onClick}
    >
      {t(name)}
    </div>
  )
}

export default SectionElement
