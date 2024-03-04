import Image from 'next/image'
import companyimage from '@/assets/Frame.jpg'
import saveFile from '@/lib/utils/save-file'
import CompanyImageItem from '@/components/pages/media-center/kiv/company-images/CompanyImageItem'
import { ComponentKivImageProps } from '@/lib/graphql/queries/kiv.query'
export interface ICompanyImages {
  data: ComponentKivImageProps[]
}

function CompanyImages({ data }: ICompanyImages) {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2  mb:grid-cols-3 gap-4 '>
        {data.map(image => (
          <CompanyImageItem
            key={image.image.data.attributes.url}
            data={image}
          />
        ))}
      </div>
    </div>
  )
}

export default CompanyImages
