import React, { FC } from 'react'
import { StructureProps } from '@/lib/graphql/queries/structure.query'
import Image from 'next/image'
import Link from 'next/link'

export interface StructureElementProps {
  data: StructureProps
}

const StructureElement: FC<StructureElementProps> = ({ data }) => {
  return (
    <Link href={`/about/structure/${data.id}`} className={'mb-5'}>
      <Image
        src={process.env.SERVER_URL + data.image.data.attributes.url}
        alt={data.image.data.attributes.alternativeText}
        width={data.image.data.attributes.width}
        height={data.image.data.attributes.height}
        className={'w-[377px] h-[283px] object-cover'}
      />
      <h2 className={'mt-4 text-[16px] text-[#111827] font-medium leading-6'}>
        {data.fullName}
      </h2>
      <p className={'text-[#6B7280] text-base leading-5'}>{data.position} </p>
    </Link>
  )
}

export default StructureElement
