import styles from './Video.module.scss'
import bg from '@/assets/icons/video-frame.jpg'
import Image from 'next/image'
import { HomeInfoProps } from '@/lib/graphql/queries'
import ReactMarkdown from 'react-markdown'
import VideoIcon from '@/assets/icons/video-icon.svg'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
export interface IVideo {
  data: HomeInfoProps
}

function Video({ data }: IVideo) {
  const { t } = useTranslation('common')
  return (
    <div className={'grid grid-cols-1 mb:grid-cols-2 mt-[50px]'}>
      <div
        className={'flex py-10 flex-col justify-center px-[50px]'}
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div>
          <ReactMarkdown className={'text-[20px] lg:text-2xl text-white mb-5'}>
            {data.attributes.video_title}
          </ReactMarkdown>
          <p
            className={
              ' text-[12px] mb:text-base text-[#F9F9F9] pl-[10px] border-l-2 border-[#ff]'
            }
          >
            {data.attributes.video_description}
          </p>
        </div>
      </div>
      <div className={'relative'}>
        <Image
          src={
            process.env.SERVER_URL +
            data.attributes.video.data[0].attributes.url
          }
          alt={data.attributes.video.data[0].attributes.alternativeText}
          width={data.attributes.video.data[0].attributes.width}
          height={data.attributes.video.data[0].attributes.height}
          className={'h-full w-full'}
        />
        <Link
          href={data.attributes.video_url}
          target={'_blank'}
          className={
            'h-[50px] w-[235px] absolute right-0 bottom-0 flex justify-center items-center bg-[#F05236]'
          }
        >
          <VideoIcon />
          <p className={'text-base font-medium text-white ml-3'}>
            {t('watch_video')}
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Video
