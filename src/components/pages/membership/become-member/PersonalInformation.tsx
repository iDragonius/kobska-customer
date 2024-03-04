import React, { FC, useState } from 'react'
import { createDefaultMaskGenerator, MaskedInput } from 'react-hook-mask'
import { useTranslation } from 'next-i18next'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { BecomeMemberForm, PhonesType } from '@/pages/membership/become-member'

export type PhoneErrorType = {
  phone1: null | string
  phone2: null | string
  company_phone1: null | string
  company_phone2: null | string
}
interface PersonalInformationProps {
  data: PhonesType
  change: (data: any) => void
  register: UseFormRegister<BecomeMemberForm>
  errors: FieldErrors<BecomeMemberForm>
  phoneErrors: PhoneErrorType
}
const maskGenerator = createDefaultMaskGenerator('99 999 99 99')
const PersonalInformation: FC<PersonalInformationProps> = ({
  data,
  change,
  register,
  errors,
  phoneErrors
}) => {
  const country_code = '+994'
  const { t } = useTranslation('membership')
  console.log(phoneErrors)
  const [day, setDay] = useState('')
  return (
    <div className='bg-[#FAFAFA] my-11 border border-[#E5E7EB] rounded-[10px] p-[50px] pb-[125px]'>
      <div className='w-full  flex flex-col  sm:flex-row justify-between sm:space-x-5 sm:space-y-0 space-y-3'>
        <div className='w-full relative'>
          <input
            type='text'
            placeholder={t('first_name') || 'Ad'}
            className='w-full text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
            {...register('first_name')}
          />
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {errors.first_name?.message}
          </p>
        </div>
        <div className='w-full relative'>
          <input
            type='text'
            placeholder={t('last_name') || 'Ad'}
            className='w-full text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
            {...register('last_name')}
          />
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {errors.last_name?.message}
          </p>
        </div>
        <div className='w-full relative'>
          <input
            type='text'
            placeholder={t('father_name') || 'Ad'}
            className='w-full text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
            {...register('father_name')}
          />
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {errors.father_name?.message}
          </p>
        </div>
      </div>
      <div className='w-full flex flex-col  items-center sm:flex-row mt-5 sm:space-x-5 sm:space-y-0 space-y-3'>
        <div className='w-full relative'>
          <div className='w-full'>
            <label className='text-[#686868] font-medium text-[12px] leading-[15px]'>
              {t('bdate')}
            </label>
            <div className='flex flex-col sm:flex-row sm:space-x-5 sm:space-y-0 space-y-5'>
              <div className='w-full relative'>
                <input
                  type='number'
                  placeholder='Gün'
                  className='bg-transparent text-base  border-b border-b-[#D1D5DB] py-[10px] w-full  hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
                  {...register('bday')}
                />
                <p className={'absolute text-[12px] text-[#EF4444]'}>
                  {errors.bday?.message}
                </p>
              </div>
              <div className='w-full relative'>
                <input
                  type='number'
                  placeholder='Ay'
                  className='bg-transparent text-base  border-b border-b-[#D1D5DB] py-[10px] w-full  hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
                  {...register('bmonth')}
                />
                <p className={'absolute text-[12px] text-[#EF4444]'}>
                  {errors.bmonth?.message}
                </p>
              </div>
              <div className='w-full relative'>
                <input
                  type='number'
                  placeholder='İl'
                  className='bg-transparent text-base  border-b border-b-[#D1D5DB] py-[10px] w-full  hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
                  {...register('byear')}
                />
                <p className={'absolute text-[12px] text-[#EF4444]'}>
                  {errors.byear?.message}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full relative'>
          <div className='w-full'>
            <label className='text-[#686868] font-medium text-[12px] leading-[15px]'>
              {t('country')}
            </label>
            <input
              type='text'
              placeholder={t('country_ph') || 'Country'}
              className='w-full text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C] '
              {...register('country')}
            />
          </div>
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {errors.country?.message}
          </p>
        </div>
      </div>
      <div className='w-full flex flex-col sm:flex-row items-center justify-between sm:space-x-5 mt-5 sm:space-y-0 space-y-3'>
        <div className='w-full relative'>
          <div className='w-full'>
            <label className='text-[#686868] font-medium text-[12px] leading-[15px]'>
              {t('phone1')}
            </label>
            <div className='flex w-full items-center relative'>
              <label className='leading-5 text-base font-medium text-[#9CA3AF] absolute'>
                {country_code}
              </label>
              <MaskedInput
                name='phone1'
                value={data.phone1}
                onChange={e => change({ ...data, phone1: e })}
                maskGenerator={maskGenerator}
                placeholder={'50 321 32 32'}
                className='w-full pl-12 text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
              />
            </div>
          </div>
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {phoneErrors.phone1}
          </p>
        </div>
        <div className='w-full relative'>
          <div className='w-full'>
            <label className='text-[#686868] font-medium text-[12px] leading-[15px]'>
              {t('phone2')}
            </label>
            <div className='flex w-full items-center relative'>
              <label className='leading-5 text-base font-medium text-[#9CA3AF] absolute'>
                {country_code}
              </label>
              <MaskedInput
                name='phone2'
                value={data.phone2}
                onChange={e => change({ ...data, phone2: e })}
                maskGenerator={maskGenerator}
                placeholder={'50 321 32 32'}
                className='w-full pl-12 text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
              />
            </div>
          </div>
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {phoneErrors.phone2}
          </p>
        </div>

        <div className='w-full relative self-end'>
          <input
            type='text'
            placeholder={t('email') || 'Email'}
            className='w-full  h-max text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
            {...register('email')}
          />
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {errors.email?.message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PersonalInformation
