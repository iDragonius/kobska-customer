import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.scss'
import { ILayoutQuery } from '@/lib/graphql/queries/layout.query'

export interface IFooter {
  loading: boolean
  data: Pick<ILayoutQuery, 'socialNetwork'>
}

const Footer = ({ loading, data }: IFooter) => {
  if (loading) {
    return <></>
  }
  const serverUrl = process.env.SERVER_URL
  return (
    <div className={'border-t border-borderGray mt-20  z-[1200]'}>
      <div className={styles.marginContainer}>
        <div className={styles.wrapper}>
          <div className={'order-2 mb:order-1 my-2 mb:my-0'}>
            <p className={'text-dateText font-medium text-base'}>
              Bütün hüquqlar qorunur. © 2023 KOBSKA.
            </p>
          </div>
          <div className={styles.socialWrapper}>
            {data.socialNetwork.data.attributes.social_networks.map(sc => (
              <Link href={sc.url} key={sc.id} className={styles.social}>
                <Image
                  src={serverUrl + sc.icon.data.attributes.url}
                  alt={sc.icon.data.attributes.alternativeText}
                  width={sc.icon.data.attributes.width}
                  height={sc.icon.data.attributes.height}
                />
              </Link>
            ))}
          </div>
          <div className={'order-3'}>
            <p className={'text-dateText font-medium text-base'}>
              Bu bir Marcom məhsuludur.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
