import styles from './Values.module.scss'
import { AchievementType } from '@/lib/graphql/queries/purpose-values-duties-goals'
import { useWindowSizeContext } from '@/context/providers/WindowSizeContextProvider'
import Download from '@/assets/icons/download.svg'
import BrandingItem from '@/components/pages/media-center/kiv/branding/BrandingItem'
import { ComponentKivBrandingProps } from '@/lib/graphql/queries/kiv.query'
export interface IBranding {
  data: ComponentKivBrandingProps[]
}

function Branding({ data }: IBranding) {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2  mb:grid-cols-4 gap-4'>
        {data.map(branding => (
          <BrandingItem
            key={branding.file.data.attributes.url}
            data={branding}
          />
        ))}
      </div>
    </div>
  )
}

export default Branding
