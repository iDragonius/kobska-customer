import { ComponentKivVideoClipProps } from '@/lib/graphql/queries/kiv.query'
import Close from '@/assets/icons/success.svg'
import { useState } from 'react'
import cx from 'classnames'
import Video from '@/components/ui/video/Video'
import VideoReelItem from '@/components/pages/media-center/kiv/video-reels/VideoReelItem'
export interface IVideoReels {
  data: ComponentKivVideoClipProps[]
}

function VideoReels({ data }: IVideoReels) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 gap-5'>
      {data.map(video => (
        <VideoReelItem
          data={video}
          key={video.video_thumb.data.attributes.url}
        />
      ))}
    </div>
  )
}

export default VideoReels
