import { AssetProps } from '@/lib/graphql/queries/news-by-slug.query'
import Image from 'next/image'
import Video from '@/components/ui/video/Video'
import { useEffect, useState } from 'react'
import Close from '@/assets/icons/close.svg'
export interface ISliderItem {
  type: string
  data: AssetProps
}

import cx from 'classnames'
function SliderItem({ data, type }: ISliderItem) {
  const [active, setActive] = useState<boolean>(false)
  useEffect(() => {
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])
  return (
    <>
      {type === 'image' ? (
        <div
          className={cx(
            active
              ? 'fixed z-[10000]  left-0 top-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center '
              : 'block'
          )}
          onClick={() => {
            if (active) {
              setActive(false)
              document.body.style.overflowY = 'auto'
            }
          }}
        >
          <div className={'flex flex-col '}>
            <div className={'self-end  py-2'}>{active && <Close />}</div>

            <Image
              onClick={e => {
                e.stopPropagation()
                if (!active) {
                  setActive(true)
                  document.body.style.overflowY = 'hidden'
                }
              }}
              src={process.env.SERVER_URL + data.url}
              alt={data.alternativeText}
              className={!active ? 'min-w-[377px]' : 'w-[600px]'}
              width={data.width}
              height={data.height}
            />
          </div>
        </div>
      ) : (
        // <div onClick={() => setOpen(true)}>
        //   <video
        //     className={'w-[377px]  object-cover '}
        //     src={process.env.SERVER_URL + data.url}
        //   />
        //   {open && <Video mime={data.mime} url={data.url} setOpen={setOpen} />}
        // </div>
        <></>
      )}
    </>
  )
}

export default SliderItem
