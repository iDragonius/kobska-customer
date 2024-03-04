import React, { FC, useState } from 'react'

interface WorkInformationProps {
  data: PhonesType
  change: (data: any) => void
  register: UseFormRegister<BecomeMemberForm>
  errors: FieldErrors<BecomeMemberForm>
  phoneErrors: PhoneErrorType
}
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form'
import { createDefaultMaskGenerator, MaskedInput } from 'react-hook-mask'
import { useTranslation } from 'next-i18next'
import { BecomeMemberForm, PhonesType } from '@/pages/membership/become-member'
import { PhoneErrorType } from './PersonalInformation'
const maskGenerator = createDefaultMaskGenerator('99 999 99 99')

const WorkInformation: FC<WorkInformationProps> = ({
  data,
  change,
  register,
  errors,
  phoneErrors
}) => {
  const country_code = '+994'
  const { t } = useTranslation('membership')

  return (
    <div className='bg-[#FAFAFA] my-11 border border-[#E5E7EB] rounded-[10px] p-[50px] pb-[125px]'>
      <div className='w-full  flex flex-col  sm:flex-row justify-between sm:space-x-5 sm:space-y-0 space-y-6'>
        <div className='w-full relative'>
          <input
            type='text'
            placeholder={t('company_name') || 'Ad'}
            className='w-full text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
            {...register('company_name')}
          />
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {errors.company_name?.message}
          </p>
        </div>
        <div className='w-full relative'>
          <input
            type='text'
            placeholder={t('field_of_activity') || 'Ad'}
            className='w-full text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
            {...register('field_of_activity')}
          />
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {errors.field_of_activity?.message}
          </p>
        </div>
        <div className='w-full relative'>
          <input
            type='number'
            placeholder={t('employee_count') || 'Ad'}
            className='w-full text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
            {...register('employee_count')}
          />
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {errors.employee_count?.message}
          </p>
        </div>
      </div>
      <div className='w-full flex flex-col sm:flex-row mt-5 sm:space-x-5 sm:space-y-0 space-y-8'>
        <div className='w-full'>
          <label className='text-[#686868] font-medium text-[12px] leading-[15px]'>
            {t('creating_date')}
          </label>
          <div className='flex flex-col sm:flex-row sm:space-x-5 sm:space-y-0 space-y-5'>
            <div className='w-full relative'>
              <input
                type='number'
                placeholder='Gün'
                className='bg-transparent text-base  border-b border-b-[#D1D5DB] py-[10px] w-full  hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
                {...register('creatingday')}
              />
              <p className={'absolute text-[12px] text-[#EF4444]'}>
                {errors.creatingday?.message}
              </p>
            </div>
            <div className='w-full relative'>
              <input
                type='number'
                placeholder='Ay'
                className='bg-transparent text-base  border-b border-b-[#D1D5DB] py-[10px] w-full  hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
                {...register('creatingmonth')}
              />
              <p className={'absolute text-[12px] text-[#EF4444]'}>
                {errors.creatingmonth?.message}
              </p>
            </div>
            <div className='w-full relative'>
              <input
                type='number'
                placeholder='İl'
                className='bg-transparent text-base  border-b border-b-[#D1D5DB] py-[10px] w-full  hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
                {...register('creatingyear')}
              />
              <p className={'absolute text-[12px] text-[#EF4444]'}>
                {errors.creatingyear?.message}
              </p>
            </div>
          </div>
        </div>
        <div className='w-full relative'>
          <div className='w-full'>
            <label className='text-[#686868] font-medium text-[12px] leading-[15px]'>
              {t('address')}
            </label>
            <input
              type='text'
              placeholder={t('address_ph') || 'Address'}
              className='w-full text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C] '
              {...register('address')}
            />
          </div>
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {errors.address?.message}
          </p>
        </div>
      </div>
      <div className='w-full flex flex-col sm:flex-row items-center justify-between sm:space-x-5 mt-5 sm:space-y-0 space-y-8'>
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
                maskGenerator={maskGenerator}
                value={data.company_phone1}
                onChange={e => change({ ...data, company_phone1: e })}
                placeholder={'50 321 32 32'}
                className='w-full pl-12 text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
              />
            </div>
          </div>
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {phoneErrors?.company_phone1}
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
                maskGenerator={maskGenerator}
                value={data.company_phone2}
                onChange={e => change({ ...data, company_phone2: e })}
                placeholder={'50 321 32 32'}
                className='w-full pl-12 text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
              />
            </div>
          </div>
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {phoneErrors?.company_phone2}
          </p>
        </div>
        <div className='w-full relative self-end'>
          <input
            type='text'
            placeholder={t('email') || 'Email'}
            className='w-full self-end h-max text-base bg-transparent border-b border-b-[#D1D5DB] py-[11px] hover:border-b-[#27749C] focus:border-b-[#27749C] transition-all ease-out hover:text-[#27749C] focus:text-[#27749C]'
            {...register('company_email')}
          />
          <p className={'absolute text-[12px] text-[#EF4444]'}>
            {errors.company_email?.message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WorkInformation
