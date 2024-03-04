import { checkboxTypesData } from '@/components/pages/contact/checkbox-types.data'
import Checkbox from '@/components/ui/checkbox/Checkbox'
import {
  ContactEnum,
  ContactMutation
} from '@/lib/graphql/mutations/contact.mutation'

import cx from 'classnames'
import { IContactQuery } from '@/lib/graphql/queries'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@apollo/client'
import { Space_Grotesk } from '@next/font/google'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from '@/components/ui/input/Input.module.scss'
import { createDefaultMaskGenerator, MaskedInput } from 'react-hook-mask'
const maskGenerator = createDefaultMaskGenerator('99 999 99 99')

export interface IForm {
  data: IContactQuery
  setSent: (sent: boolean) => void
}
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
})
type ContactSubmitForm = {
  first_name: string
  last_name: string
  email: string
  phone: string
  message: string
}

function Form({ data, setSent }: IForm) {
  const { t } = useTranslation('contact')
  const [restData, setRestData] = useState<{
    type: ContactEnum
    phone: string
  }>({ type: ContactEnum.complaint, phone: '' })
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required(t('first_name_required') || 'First name is required')
      .min(
        3,
        t('first_name_incorrect') || 'First name must be at least 3 characters'
      ),
    last_name: Yup.string()
      .required(t('last_name_required') || 'Last name is required')
      .min(
        3,
        t('last_name_incorrect') || 'Last name must be at least 3 characters'
      ),

    email: Yup.string()
      .required(t('email_required') || 'Email is required')
      .email(t('email_incorrect') || 'Email is invalid'),

    message: Yup.string()
  })
  const [mutateFunction] = useMutation(ContactMutation())
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactSubmitForm>({
    resolver: yupResolver(validationSchema)
  })
  const code = '+994'
  const createContact = (data: ContactSubmitForm) => {
    mutateFunction({
      variables: {
        ...data,
        ...restData
      }
    }).then(() => {
      setSent(true)
    })
  }
  return (
    <div>
      <div>
        <h1 className={'font-semibold text-2xl mb-3'}>{t('contact')}</h1>
        <p
          className={
            'font-medium text-[#8C8C8C] text-lg w-full mb:w-1/2 xl:1/3 '
          }
        >
          {t('contact_description')}
        </p>
      </div>
      <div
        className={
          'flex mb:flex-row flex-col gap-10  justify-between relative '
        }
      >
        <div className={'mt-5 w-full lg:w-1/2 '}>
          <div className={'mb-10'}>
            <div className={'flex '}>
              {checkboxTypesData.map(checkbox => {
                return (
                  <Checkbox
                    label={t(checkbox.value)}
                    key={checkbox.value}
                    className={'mr-3'}
                    checked={restData.type === checkbox.value}
                    onClick={() =>
                      setRestData({
                        ...restData,
                        type: ContactEnum[checkbox.value as ContactEnum]
                      })
                    }
                    onChange={() =>
                      setRestData({
                        ...restData,
                        type: ContactEnum[checkbox.value as ContactEnum]
                      })
                    }
                  />
                )
              })}
            </div>
          </div>
          <form onSubmit={handleSubmit(createContact)}>
            <div className={'flex flex-wrap gap-y-5 lg:gap-y-10 mr-0 mb:mr-5'}>
              <div
                className={
                  'flex justify-between w-full gap-y-5  gap-x-5 flex-col lg:flex-row '
                }
              >
                <div className={'w-full relative'}>
                  <input
                    placeholder={t('form_firstName') || 'First name'}
                    type={'text'}
                    className={cx(
                      ' w-full  ',
                      styles.textInput,
                      errors.first_name
                        ? 'border-b border-b-[#EF4444]'
                        : 'border-b border-b-[#D1D5DB]'
                    )}
                    {...register('first_name')}
                  />
                  <p className={'absolute text-[12px] text-[#EF4444]'}>
                    {errors.first_name?.message}
                  </p>
                </div>
                <div className={'w-full relative'}>
                  <input
                    placeholder={t('form_lastName') || 'Last name'}
                    type={'text'}
                    className={cx(
                      styles.textInput,
                      ' w-full ',
                      errors.last_name
                        ? 'border-b border-b-[#EF4444]'
                        : 'border-b border-b-[#D1D5DB]'
                    )}
                    {...register('last_name')}
                  />
                  <p className={'absolute text-[12px] text-[#EF4444]'}>
                    {errors.last_name?.message}
                  </p>
                </div>
              </div>
              <div
                className={'flex w-full gap-x-5  gap-y-5 flex-col lg:flex-row '}
              >
                <div className={'w-full relative'}>
                  <div className={cx(styles.phoneBlock, ' w-full')}>
                    <MaskedInput
                      value={restData.phone}
                      onChange={data =>
                        setRestData({ ...restData, phone: data })
                      }
                      maskGenerator={maskGenerator}
                      placeholder={'50 343 56 87'}
                      className={cx(
                        styles.phoneInput,
                        errors.phone
                          ? 'border-b border-b-[#EF4444]'
                          : 'border-b border-b-[#D1D5DB]'
                      )}
                    />
                    <label className={styles.phoneLabel}>{code}</label>
                  </div>
                  <p className={'absolute text-[12px] text-[#EF4444]'}>
                    {errors.phone?.message}
                  </p>
                </div>

                <div className={'w-full relative'}>
                  <input
                    placeholder={t('form_email') || 'Email'}
                    type={'text'}
                    className={cx(
                      styles.textInput,
                      ' w-full',
                      errors.email
                        ? 'border-b border-b-[#EF4444]'
                        : 'border-b border-b-[#D1D5DB]'
                    )}
                    {...register('email')}
                  />

                  <p className={'absolute text-[12px] text-[#EF4444]'}>
                    {errors.email?.message}
                  </p>
                </div>
              </div>

              <textarea
                placeholder={t('form_message') || 'Message'}
                className={cx(styles.textareaInput, 'basis-full w-full mb-5 ')}
                {...register('message')}
              />
            </div>
            <button
              type={'submit'}
              className={
                'mb-12 border border-[#27749C] transition-all ease-in-out hover:bg-[#27749C] hover:text-white text-[#27749C] py-[6.5px] px-[60px] text-[16px] leading-[20px]'
              }
            >
              {t('send')}
            </button>
          </form>
        </div>
        <div>
          <div
            className={cx(
              'p-10 bg-[#F05236] text-2xl absolute left-[-20px] sm:left-[-30px]  mb:left-0  w-screen mb:max-w-[500px] mb:relative ',
              spaceGrotesk.className
            )}
          >
            <div>
              <h2 className={'text-[#F1F1F1]'}>{t('phone')}</h2>
              <p className={'font-bold text-white'}>
                {data.contactInfo.data.attributes.phone}
              </p>
            </div>
            <div className={'my-10'}>
              <h2 className={'text-[#F1F1F1]'}>{t('email')}</h2>
              <p className={'font-bold text-white'}>
                {data.contactInfo.data.attributes.email}
              </p>
            </div>
            <div>
              <h2 className={'text-[#F1F1F1]'}>{t('address')}</h2>
              <p className={'font-bold text-white'}>
                {data.contactInfo.data.attributes.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
