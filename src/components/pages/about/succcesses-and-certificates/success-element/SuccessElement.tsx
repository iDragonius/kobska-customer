import { SuccessProps } from '@/lib/graphql/queries/successes-and-certificates.query'
import { useTranslation } from 'next-i18next'
import saveFile from '@/lib/utils/save-file'
import Image from 'next/image'
import { useState } from 'react'
import Close from '@/assets/icons/close.svg'
export interface ISuccessElement {
  data: SuccessProps
}

function SuccessElement({ data }: ISuccessElement) {
  const { t } = useTranslation('about')
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <>
      {isOpen && (
        <div
          className='fixed bg-black bg-opacity-60 h-full w-full left-0 top-0 z-[1000] flex  justify-center items-center'
          onClick={() => setOpen(false)}
        >
          <div className='w-5/6'>
            <Close
              className={'stroke-white cursor-pointer float-right'}
              onClick={() => setOpen(false)}
            />
            <Image
              onClick={e => e.stopPropagation()}
              src={
                process.env.SERVER_URL +
                data.attributes.image.data.attributes.url
              }
              alt={data.attributes.image.data.attributes.alternativeText}
              width={data.attributes.image.data.attributes.width}
              height={data.attributes.image.data.attributes.height}
            />
          </div>
        </div>
      )}
      <div className='  group' onClick={() => setOpen(true)}>
        <div className='border hover:border-hoverColor transition-all ease-in-out cursor-pointer'>
          <Image
            src={
              process.env.SERVER_URL + data.attributes.image.data.attributes.url
            }
            alt={data.attributes.image.data.attributes.alternativeText}
            width={data.attributes.image.data.attributes.width}
            height={data.attributes.image.data.attributes.height}
          />
        </div>

        <h3 className='text-[#111827] w-full text-center mt-2 text-[16px] font-[500]  '>
          {data.attributes.name}
        </h3>
      </div>
    </>
  )
}

export default SuccessElement
