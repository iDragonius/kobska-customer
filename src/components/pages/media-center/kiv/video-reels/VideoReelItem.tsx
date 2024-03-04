import { ComponentKivVideoClipProps } from '@/lib/graphql/queries/kiv.query'
import Link from 'next/link'
import Image from 'next/image'

export interface IVideoReelItem {
  data: ComponentKivVideoClipProps
}

function VideoReelItem({ data }: IVideoReelItem) {
  // const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className='relative'>
        <Image
          alt={data.video_thumb.data.attributes.alternativeText}
          width={data.video_thumb.data.attributes.width}
          height={data.video_thumb.data.attributes.height}
          className={'w-full h-[283px] object-cover '}
          src={process.env.SERVER_URL + data.video_thumb.data.attributes.url}
        />
        <div className='absolute inset-0 bg-[#27749C] bg-opacity-50 p-4 opacity-0 hover:opacity-100 transition-opacity'>
          <Link
            href={data.url}
            target={'_blank'}
            // onClick={() => setOpen(true)}
            className='absolute top-1/2 text-center left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-[#27749C] bg-opacity-50 border border-[#FFFFFF] rounded-[50px] text-[#FFFFFF] w-[183px]'
          >
            Videoya bax
          </Link>
        </div>
      </div>
      {/*{open && (*/}
      {/*  <Video*/}
      {/*    url={data.video.data.attributes.url}*/}
      {/*    mime={data.video.data.attributes.mime}*/}
      {/*    setOpen={setOpen}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  )
}

export default VideoReelItem
