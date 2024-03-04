import Image from 'next/image'
import companyimage from '@/assets/Frame.jpg'
import saveFile from '@/lib/utils/save-file'
import { ComponentKivImageProps } from '@/lib/graphql/queries/kiv.query'

export interface ICompanyImageElement {
  data: ComponentKivImageProps
}

function CompanyImageItem({ data }: ICompanyImageElement) {
  return (
    <div className='relative w-full  '>
      <Image
        src={process.env.SERVER_URL + data.image.data.attributes.url}
        alt={data.image.data.attributes.alternativeText}
        width={data.image.data.attributes.width}
        height={data.image.data.attributes.height}
        className={'w-full   '}
        style={{ objectFit: 'cover' }}
        priority={true}
      />
      <div className='absolute inset-0 bg-[#27749C] opacity-0 hover:opacity-100 transition-opacity'>
        <button
          onClick={() =>
            saveFile(
              data.image.data.attributes.url,
              data.image.data.attributes.name
            )
          }
          className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-16 py-2 bg-[#27749C] border border-[#FFFFFF] text-[16px] leading-[20px]  rounded-[50px] text-[#FFFFFF] hover:bg-white hover:text-[#27749C] transition-all ease-in-out'
        >
          Yüklə
        </button>
      </div>
    </div>
  )
}

export default CompanyImageItem
