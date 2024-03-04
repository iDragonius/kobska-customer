import { ReactNode, useRef } from 'react'
import { useRouter } from 'next/router'
import { SocialNetworksShareEnum } from '@/config/social-networks-share.enum'
import cx from 'classnames'
export interface IShareItem {
  icon: ReactNode
  onClick?: () => void
  copyItem: boolean
  socialNetwork: SocialNetworksShareEnum
}

function ShareItem({ icon, onClick, copyItem, socialNetwork }: IShareItem) {
  const clientUrl = process.env.CLIENT_URL
  const { asPath, locale } = useRouter()
  const tooltipRef = useRef<HTMLDivElement>(null)
  return (
    <>
      {copyItem ? (
        <div
          className={' group relative'}
          onClick={() => {
            if (onClick) {
              onClick()
            }
            if (tooltipRef.current) {
              tooltipRef.current.classList.toggle('hidden')
            }
            setTimeout(() => {
              if (tooltipRef.current) {
                tooltipRef.current.classList.toggle('hidden')
              }
            }, 1000)
          }}
        >
          <div
            className={cx(
              'w-6 h-6 flex items-center justify-center bg-[#27749C] group-hover:ring-4 group-hover:ring-opacity-40 group-hover:ring-[#27749C]   transition-all ease-in-out min-w-6 min-h-6 rounded-full cursor-pointer '
            )}
          >
            {icon}
          </div>
          <div
            role={'tooltip'}
            ref={tooltipRef}
            className={
              'px-3 py-2 bg-gray-800 text-white absolute text-[12px] rounded-lg w-max top-2 left-6 hidden  transition-all ease-in-out '
            }
          >
            Copied!
          </div>
        </div>
      ) : (
        <a
          href={`${socialNetwork + clientUrl + '/' + locale + asPath}`}
          rel={'noreferrer'}
          target={'_blank'}
          className={cx(
            'w-6 h-6  items-center justify-center bg-[#27749C] hover:ring-4 hover:ring-opacity-40 hover:ring-[#27749C]   transition-all ease-in-out min-w-6 min-h-6 rounded-full cursor-pointer hidden mb:flex'
          )}
          onClick={onClick}
        >
          {icon}
        </a>
      )}
    </>
  )
}

export default ShareItem
