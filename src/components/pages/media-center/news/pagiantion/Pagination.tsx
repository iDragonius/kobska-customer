import PaginationIconLeft from '@/assets/icons/pagination.svg'
import { useTranslation } from 'next-i18next'
import { useLazyQuery, useQuery } from '@apollo/client'
import { INewsQuery, NewsQuery } from '@/lib/graphql/queries/news.query'
import { useEffect, useState } from 'react'
import { useWindowSizeContext } from '@/context/providers/WindowSizeContextProvider'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { LanguagesQueryEnum } from '@/config'
import { IActivitiesQuery } from '@/lib/graphql/queries/activities.query'
import { PaginationData } from '@/config/pagination.data'
export interface IPagination {
  data: {
    pagination: {
      pageCount: number
      pageSize: number
      page: number
      total: number
    }
  }
  setData: (data: INewsQuery & IActivitiesQuery) => void
  getData: ({
    variables: { locale, pageSize, page, search }
  }: {
    variables: {
      locale: LanguagesQueryEnum
      pageSize: number
      page: number
      search: string
    }
  }) => Promise<{ data: INewsQuery & IActivitiesQuery }>
}
const Pagination = ({ data, setData, getData }: IPagination) => {
  const { t } = useTranslation('news')
  const [paginationNumbers, setPaginationNumbers] = useState<number[]>([])
  const windowSize = useWindowSizeContext()
  const { locale, asPath, push, query } = useRouter()
  useEffect(() => {
    const temp = []
    if (data.pagination.page !== 1) {
      temp.push(data.pagination.page - 1)
    }
    temp.push(data.pagination.page)
    if (data.pagination.page + 1 <= data.pagination.pageCount) {
      temp.push(data.pagination.page + 1)
    }
    if (data.pagination.page + 2 <= data.pagination.pageCount) {
      temp.push(data.pagination.page + 2)
    }

    setPaginationNumbers(temp)
  }, [data.pagination])
  return (
    <>
      {data.pagination.pageCount > 1 && (
        <div
          className={
            'flex items-center p-4 border border-[#EEEEEE] w-max mx-auto mt-[50px]'
          }
        >
          <div
            className={
              data.pagination.page === 1
                ? 'flex items-center bg-[#F5F5FF] opacity-50 p-2  transition-all ease-in-out cursor-pointer'
                : 'flex items-center hover:bg-[#F5F5FF] p-2 hover:text-[#27749C] transition-all ease-in-out cursor-pointer'
            }
            onClick={() => {
              if (data.pagination.page === 1) {
                return
              }
              getData({
                variables: {
                  locale:
                    LanguagesQueryEnum[
                      locale as keyof typeof LanguagesQueryEnum
                    ],
                  pageSize: query.pageSize
                    ? +query.pageSize
                    : PaginationData.pageSize,
                  page: data.pagination.page - 1,
                  search: ''
                }
              }).then(res => setData(res.data))
              push(asPath, {
                query: {
                  pageSize: query.pageSize
                    ? +query.pageSize
                    : PaginationData.pageSize,
                  page: data.pagination.page - 1
                }
              })
            }}
          >
            <PaginationIconLeft className={'mr-2'} />
            <span
              className={cx(
                'text-[#374151]',
                windowSize.width > 640 ? 'block' : 'hidden'
              )}
            >
              {t('back')}
            </span>
          </div>

          {paginationNumbers.map(page => (
            <span
              onClick={e => {
                if (data.pagination.page === page) {
                  return
                }
                getData({
                  variables: {
                    locale:
                      LanguagesQueryEnum[
                        locale as keyof typeof LanguagesQueryEnum
                      ],
                    pageSize: query.pageSize
                      ? +query.pageSize
                      : PaginationData.pageSize,
                    page: +(e.target as Element).innerHTML,
                    search: ''
                  }
                }).then(res => {
                  setData(res.data)
                })
                push(asPath, {
                  query: {
                    pageSize: query.pageSize
                      ? +query.pageSize
                      : PaginationData.pageSize,
                    page: +(e.target as Element).innerHTML
                  }
                })
              }}
              key={page}
              className={
                data.pagination.page === page
                  ? 'p-2 px-4 text-base mx-2 bg-[#F5F5FF] hover:text-[#27749C] transition-all ease-in-out cursor-pointer'
                  : 'p-2 px-4 text-base mx-2 hover:bg-[#F5F5FF] hover:text-[#27749C] transition-all ease-in-out cursor-pointer'
              }
            >
              {page}
            </span>
          ))}

          <div
            className={
              data.pagination.page === data.pagination.pageCount
                ? 'flex items-center bg-[#F5F5FF] opacity-50 p-2  transition-all ease-in-out cursor-pointer'
                : 'flex items-center hover:bg-[#F5F5FF] p-2 hover:text-[#27749C] transition-all ease-in-out cursor-pointer'
            }
            onClick={() => {
              if (data.pagination.page === data.pagination.pageCount) {
                return
              }
              getData({
                variables: {
                  locale:
                    LanguagesQueryEnum[
                      locale as keyof typeof LanguagesQueryEnum
                    ],
                  pageSize: query.pageSize
                    ? +query.pageSize
                    : PaginationData.pageSize,
                  page: data.pagination.page + 1,
                  search: ''
                }
              }).then(res => setData(res.data))
              push(asPath, {
                query: {
                  pageSize: query.pageSize
                    ? +query.pageSize
                    : PaginationData.pageSize,
                  page: data.pagination.page + 1
                }
              })
            }}
          >
            <span
              className={cx(
                'text-[#374151]',
                windowSize.width > 640 ? 'block' : 'hidden'
              )}
            >
              {t('forward')}
            </span>
            <PaginationIconLeft className={'rotate-180 ml-2'} />
          </div>
        </div>
      )}
    </>
  )
}

export default Pagination
