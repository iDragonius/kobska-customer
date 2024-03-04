import styles from './Branding.module.scss'
import Download from '@/assets/icons/download.svg'
import cx from 'classnames'
import saveFile from '@/lib/utils/save-file'
import { ComponentKivBrandingProps } from '@/lib/graphql/queries/kiv.query'
export interface IBrandingItem {
  data: ComponentKivBrandingProps
}

function BrandingItem({ data }: IBrandingItem) {
  return (
    <div className='bg-white border border-gray-300 p-5 hover:border-[#27749C] transition-colors duration-300'>
      <h3 className='text-[#111827] text-[16px] font-[500] mb-1'>
        {data.title}
      </h3>
      <p className='text-[#6B7280] text-[16px] font-[500] leading-[24px]'>
        {data.description}
      </p>
      <button
        className={styles.button}
        onClick={() =>
          saveFile(
            data.file.data.attributes.url,
            data.file.data.attributes.name
          )
        }
      >
        <p className={styles.downloadText}>Yüklə</p>
        <Download className={cx(styles.download, 'stroke-[#111827]')} />
      </button>
    </div>
  )
}

export default BrandingItem
