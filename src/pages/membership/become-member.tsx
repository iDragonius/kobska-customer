import React, { type FC, useState } from 'react'
import cx from 'classnames'
import Completed from '@/assets/icons/completed.svg'
import PersonalInformation, {
  PhoneErrorType
} from '@/components/pages/membership/become-member/PersonalInformation'
import WorkInformation from '@/components/pages/membership/become-member/WorkInformation'
import Success from '@/components/pages/contact/Success'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMutation } from '@apollo/client'
import { MemberMutation } from '@/lib/graphql/mutations/member.mutation'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
const steps = [
  {
    id: 1,
    label: 'Şəxsi məlumatlar',
    last: false
  },
  {
    id: 2,
    label: 'İş yeri məlumatları',
    last: true
  }
]
export type PhonesType = {
  phone1: string
  phone2: string
  company_phone1: string
  company_phone2: string
}
export type BecomeMemberForm = {
  first_name: string
  last_name: string
  father_name: string
  // bdate: string
  country: string
  phone1: string
  phone2: string
  email: string
  bday: number
  bmonth: number
  byear: number
  creatingday: number
  creatingmonth: number
  creatingyear: number
  company_name: string
  field_of_activity: string
  employee_count: number | ''
  creating_date: string
  address: string
  company_phone1: string
  company_phone2: string
  company_email: string
}
const BecomeMemberPage: FC = ({}) => {
  const [active, setActive] = useState<number>(1)
  const [data, setData] = useState<PhonesType>({
    phone1: '',
    phone2: '',
    company_phone1: '',
    company_phone2: ''
  })
  const [phoneErrors, setPhoneErrors] = useState<PhoneErrorType>({
    phone1: null,
    phone2: null,
    company_phone1: null,
    company_phone2: null
  })
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Adınızı daxil edin!'),
    last_name: Yup.string().required('Soyadınızı daxil edin!'),
    father_name: Yup.string().required('Ata adını daxil edin!'),
    // bdate: Yup.string().required('Doğum tarixini daxil edin'),
    bday: Yup.number()
      .typeError('Doğum gününü daxil edin')
      .min(1, 'Doğum gününü düzgün daxil edin')
      .max(31, 'Doğum gününü düzgün daxil edin')
      .required('Doğum gününü daxil edin'),
    bmonth: Yup.number()
      .typeError('Doğum ayını daxil edin')
      .min(1, 'Doğum ayını düzgün daxil edin')
      .max(12, 'Doğum ayını düzgün daxil edin')
      .required('Doğum ayını daxil edin'),
    byear: Yup.number()
      .typeError('Doğum ilini daxil edin')
      .min(1900, 'Doğum ilini düzgün daxil edin')
      .max(2023, 'Doğum ilini düzgün daxil edin')
      .required('Doğum ilini daxil edin'),
    creatingday: Yup.number()
      .typeError('Yaranma gününü daxil edin')
      .min(1, 'Yaranma gününü düzgün daxil edin')
      .max(31, 'Yaranma gününü düzgün daxil edin')
      .required('Yaranma gününü daxil edin'),
    creatingmonth: Yup.number()
      .typeError('Yaranma ayını daxil edin')
      .min(1, 'Yaranma ayını düzgün daxil edin')
      .max(12, 'Yaranma ayını düzgün daxil edin')
      .required('Yaranma ayını daxil edin'),
    creatingyear: Yup.number()
      .typeError('Yaranma ilini daxil edin')
      .min(1800, 'Yaranma ilini düzgün daxil edin')
      .max(2023, 'Yaranma ilini düzgün daxil edin')
      .required('Yaranma ilini daxil edin'),
    country: Yup.string().required('Ölkə daxil edin!'),
    email: Yup.string()
      .required('Elektron poçtunu daxil edin!')
      .email('Elektron poçtunu düzgün daxil edin!'),
    company_name: Yup.string().required('Şirkət adını daxil edin!'),
    field_of_activity: Yup.string().required('Fəaliyyət sahəsini daxil edin!'),
    employee_count: Yup.string().required('Əməkdaş sayını daxil edin!'),
    creating_date: Yup.string().required('Yaranma tarxini daxil edin!'),
    address: Yup.string().required('Ünvanı daxil edin!'),
    company_email: Yup.string()
      .required('Elektron poçtunu daxil edin!')
      .email('Elektron poçtunu düzgün daxil edin!')
  })
  const [mutateFunction] = useMutation(MemberMutation())
  const {
    register,
    formState: { errors },
    trigger,
    getValues
  } = useForm<BecomeMemberForm>({
    resolver: yupResolver(validationSchema)
  })
  const changeStep = async (state: 1 | -1) => {
    if (state === 1) {
      if (active === 3) {
        return
      }
      if (active === 2) {
        let isValid = await trigger([
          'company_name',
          'field_of_activity',
          'employee_count',
          'company_email',
          'address',
          'creatingday',
          'creatingmonth',
          'creatingyear'
        ])
        const phoneTemp: PhoneErrorType = {
          phone1: null,
          phone2: null,
          company_phone1: null,
          company_phone2: null
        }
        if (data.company_phone1.length < 9) {
          phoneTemp.company_phone1 = 'Telefon nömrəsini daxil edin!'
          isValid = false
        }
        if (data.company_phone2.length < 9) {
          phoneTemp.company_phone2 = 'Telefon nömrəsini daxil edin!'
          isValid = false
        }
        setPhoneErrors({ ...phoneTemp })
        if (!isValid) return
        mutateFunction({
          variables: {
            ...getValues(),
            ...data,
            employee_count: +getValues('employee_count'),
            creating_date:
              getValues('creatingyear') +
              '-' +
              getValues('creatingmonth') +
              '-' +
              getValues('creatingday'),

            bdate:
              getValues('byear') +
              '-' +
              getValues('bmonth') +
              '-' +
              getValues('bday')
          }
        })
      }
      if (active === 1) {
        let isValid = await trigger([
          'first_name',
          'father_name',
          'last_name',
          // 'bdate',
          'country',
          'email',
          'bday',
          'bmonth',
          'byear'
        ])

        const phoneTemp: PhoneErrorType = {
          phone1: null,
          phone2: null,
          company_phone1: null,
          company_phone2: null
        }
        if (data.phone1.length < 9) {
          phoneTemp.phone1 = 'Telefon nömrəsini daxil edin!'
          isValid = false
        }
        if (data.phone2.length < 9) {
          phoneTemp.phone2 = 'Telefon nömrəsini daxil edin!'
          isValid = false
        }
        setPhoneErrors({ ...phoneTemp })
        if (!isValid) return
      }
      setActive(i => (i = i + 1))
    } else {
      if (active === 1) {
        return
      }
      setActive(i => (i = i - 1))
    }
  }
  return (
    <>
      <Head>
        <title>Üzv ol</title>
      </Head>
      <main className='w-full  items-center'>
        {active !== 3 && (
          <div className='p-5 max-w-[400px] mx-auto'>
            <div className='mx-4 p-4'>
              <div className='flex items-center'>
                {steps.map(step => (
                  <>
                    <div
                      key={step.id}
                      className='flex items-center text-teal-600 relative'
                    >
                      <div
                        className={cx(
                          step.id < active
                            ? 'rounded-full transition flex justify-center items-center duration-500 ease-in-out h-9 w-9 py-3  bg-[#27749C]'
                            : step.id > active
                            ? 'rounded-full transition flex justify-center items-center duration-500 ease-in-out h-9 w-9 py-3 border-2 border-[#E5E7EB]'
                            : 'rounded-full transition flex justify-center items-center duration-500 ease-in-out h-9 w-9 py-3 border-2 border-[#27749C]'
                        )}
                      >
                        <div
                          className={cx(
                            step.id === active &&
                              'w-3 h-3 rounded-full bg-[#27749C]'
                          )}
                        >
                          {step.id < active && <Completed />}
                        </div>
                      </div>
                      <div
                        className={cx(
                          step.id <= active
                            ? 'absolute top-0 -ml-[60px] w-max text-center mt-12  leading-6 text-[12px] sm:text-[16px] font-bold  text-[#27749C]'
                            : 'absolute top-0 -ml-[60px] w-max text-center mt-12 leading-6 text-[12px] sm:text-[16px] font-bold  text-[#C8C8C8]'
                        )}
                      >
                        {step.id + '. ' + step.label}
                      </div>
                    </div>
                    {!step.last && (
                      <div
                        className={cx(
                          step.id < active
                            ? 'flex-auto border-t-2 transition duration-500 ease-in-out border-[#27749C]'
                            : 'flex-auto border-t-2 transition duration-500 ease-in-out border-[#E5E7EB]'
                        )}
                      />
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        )}

        <div>
          {active === 1 && (
            <PersonalInformation
              data={data}
              change={setData}
              register={register}
              errors={errors}
              phoneErrors={phoneErrors}
            />
          )}
          {active === 2 && (
            <WorkInformation
              data={data}
              change={setData}
              register={register}
              errors={errors}
              phoneErrors={phoneErrors}
            />
          )}
          {active === 3 && <Success type={'membership'} />}
        </div>
        <div className='flex space-x-5 justify-center w-full'>
          {active !== 3 && (
            <>
              {active !== 1 && (
                <button
                  className='w-[183px] text-center h-[35px] border border-[#27749C] bg-transparent text-[#27749C]'
                  onClick={() => changeStep(-1)}
                >
                  Geri
                </button>
              )}

              <button
                className='w-[183px] text-center h-[35px] bg-[#27749C] text-white'
                onClick={() => changeStep(1)}
              >
                Növbəti
              </button>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['membership']))
    }
  }
}

export default BecomeMemberPage
