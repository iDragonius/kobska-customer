import Close from '@/assets/icons/close.svg'
import { ComponentKivVideoClipProps } from '@/lib/graphql/queries/kiv.query'

export interface IVideo {
  url: string
  mime: string
  setOpen: (state: boolean) => void
}

function Video({ mime, url, setOpen }: IVideo) {
  return (
    <div
      className={
        'absolute flex justify-center items-center w-full h-full bg-black bg-opacity-40 left-0 top-0 z-[1000] '
      }
      onClick={() => setOpen(false)}
    >
      <div
        className={'w-[1000px] rounded-[20px]'}
        onClick={e => e.stopPropagation()}
      >
        <div className={' pb-3 pt-2 px-4 rounded-[10px]'}>
          <Close
            className={'cursor-pointer mb-2   float-right'}
            style={{ stroke: '#fff' }}
            onClick={() => setOpen(false)}
          />
          <video className={'w-full'} controls={true}>
            <source src={process.env.SERVER_URL + url} type={mime} />
          </video>
        </div>
      </div>
    </div>
  )
}

export default Video
