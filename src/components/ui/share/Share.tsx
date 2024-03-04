import Linkedin from '@/assets/icons/social-icons/linkedin.svg'
import Link from '@/assets/icons/social-icons/link.svg'
import Facebook from '@/assets/icons/social-icons/facebook.svg'
import { useRouter } from 'next/router'
import ShareItem from '@/components/ui/share/ShareItem'
import { SocialNetworksShareEnum } from '@/config/social-networks-share.enum'

export interface IShare {
  label: string
}

function Share({ label }: IShare) {
  const clientUrl = process.env.CLIENT_URL
  const { asPath, locale } = useRouter()

  return (
    <div
      className={
        'p-[10px] rounded-[6px] border border-[#EEEEEE] bg-white fixed bottom-5 mr-5 lg:mr-0 z-[100] mb:sticky mb:top-40 w-max h-max '
      }
    >
      <h3 className={'text-base font-medium text-[#27749C] text-center mb-3'}>
        {label}
      </h3>
      <div className={'flex flex-col items-center gap-y-3'}>
        <ShareItem
          icon={<Facebook />}
          copyItem={false}
          socialNetwork={SocialNetworksShareEnum.FACEBOOK}
        />
        <ShareItem
          icon={<Linkedin />}
          copyItem={false}
          socialNetwork={SocialNetworksShareEnum.LINKEDIN}
        />
        <ShareItem
          socialNetwork={SocialNetworksShareEnum.SHARE}
          icon={<Link />}
          copyItem={true}
          onClick={() => {
            navigator.clipboard.writeText(clientUrl + '/' + locale + asPath)
          }}
        />
      </div>
    </div>
  )
}

export default Share
