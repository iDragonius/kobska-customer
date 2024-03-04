import SuccesIcon from '@/assets/icons/success.svg'
import { useTranslation } from 'next-i18next'
import Button from '@/components/ui/button/Button'
import { useRouter } from 'next/router'
function Success({ type }: { type: 'contact' | 'membership' }) {
  const { t } = useTranslation(type)
  const { push } = useRouter()
  return (
    <div
      className={
        'flex flex-col items-center max-w-[800px] mx-auto bg-[#F4F4F4] border border-[#EEEEEE] p-[50px]'
      }
    >
      <div
        className={
          'flex justify-center items-center w-[232px] h-[232px] rounded-full  bg-[#1D9698] bg-opacity-10 mb-8'
        }
      >
        <div
          className={
            ' flex justify-center items-center w-[140px] h-[140px] rounded-full  bg-[#1D9698] bg-opacity-20'
          }
        >
          <SuccesIcon />
        </div>
      </div>
      <p className={'text-[#1D9698] text-[18px] font-medium text-center'}>
        {t('message_sent')}
      </p>
      <p
        className={
          'text-[#070707] text-[18px] font-medium mb-[50px] text-center'
        }
      >
        {t('soon')}
      </p>
      <Button
        variant={'contact'}
        label={t('home_page')}
        onClick={() => push('/')}
      />
    </div>
  )
}

export default Success
