import { DirectorProps } from '@/lib/graphql/queries/board-of-directors.query'
import Image from 'next/image'

export interface IDirectorElement {
  data: DirectorProps
}

function DirectorElement({ data }: IDirectorElement) {
  return (
    <div className={'mb-5'}>
      <Image
        src={process.env.SERVER_URL + data.image.data.attributes.url}
        alt={data.image.data.attributes.alternativeText}
        width={data.image.data.attributes.width}
        height={data.image.data.attributes.height}
        className={'w-[377px] h-[283px] object-cover'}
      />
      <h2 className={'mt-4 text-[16px] text-[#111827] font-medium leading-6'}>
        {data.name}
      </h2>
      <p className={'text-[#6B7280] text-base leading-5'}>{data.position} </p>
    </div>
  )
}

export default DirectorElement
