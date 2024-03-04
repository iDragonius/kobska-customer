import SectionElement from '@/components/pages/media-center/kiv/sections/section/SectionElement'
import { KivEnums } from '@/pages/media-center/kiv'

export interface ISections {
  active: string
  setActive: (active: KivEnums) => void
}

function Sections({ active, setActive }: ISections) {
  return (
    <div
      className={
        '  flex  min-[730px]:justify-center mb-2 min-[730px]:mb-7   min-[730px]:pb-0 pb-5 w-full  overflow-x-auto'
      }
    >
      <SectionElement
        name={KivEnums.COMPANY_IMAGES}
        active={active}
        className={'mr-[10px]'}
        onClick={() => setActive(KivEnums.COMPANY_IMAGES)}
      />
      <SectionElement
        name={KivEnums.BRANDING}
        active={active}
        className={'mr-[10px]'}
        onClick={() => setActive(KivEnums.BRANDING)}
      />
      <SectionElement
        name={KivEnums.VIDEO_REELS}
        active={active}
        onClick={() => setActive(KivEnums.VIDEO_REELS)}
      />
    </div>
  )
}

export default Sections
