import styles from './MemberElement.module.scss'
import { MemberProps } from '@/lib/graphql/queries/members.query'
import Image from 'next/image'
import Link from 'next/link'

export interface IMemberElement {
  data: MemberProps
}

function MemberElement({ data }: IMemberElement) {
  return (
    <Link
      href={`/membership/members/${data.id}`}
      className={
        'relative group transition-all ease-in-out flex flex-col items-center'
      }
    >
      <div className={'py-3 w-full border flex justify-center '}>
        <Image
          src={
            process.env.SERVER_URL + data.attributes.logo.data.attributes.url
          }
          alt={data.attributes.logo.data.attributes.alternativeText}
          width={data.attributes.logo.data.attributes.width}
          height={data.attributes.logo.data.attributes.height}
          className='h-[315px] object-contain'
        />
      </div>
      <div className='border h-full px-5 pb-5 group-hover:border-hoverColor'>
        <h2 className={'mt-4 text-[16px] text-[#111827] font-medium leading-6'}>
          {data.attributes.name}
        </h2>
        <p className={'text-[#6B7280] text-base leading-5  line-clamp-3 mt-3 '}>
          {data.attributes?.description}
        </p>
      </div>
    </Link>
  )
}

export default MemberElement
