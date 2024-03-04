import SectionElement from '@/components/pages/membership/termsOfMembership/sections/section/SectionElement'
import { SectionsEnum } from '@/pages/about/purpose-values-duties-goals'

export interface ISections {
  active: string
  setActive: (active: SectionsEnum) => void
}

function Sections({ active, setActive }: ISections) {
  return (
    <div
      className={
        ' flex  min-[400px]:justify-center mb-[29px] py-5 min-[400px]:py-0 w-full overflow-x-auto'
      }
    >
      <SectionElement
        name={SectionsEnum.PURPOSE}
        active={active}
        className={'mr-[10px]'}
        onClick={() => setActive(SectionsEnum.PURPOSE)}
      />
      <SectionElement
        name={SectionsEnum.VALUES}
        active={active}
        onClick={() => setActive(SectionsEnum.VALUES)}
      />
    </div>
  )
}

export default Sections
