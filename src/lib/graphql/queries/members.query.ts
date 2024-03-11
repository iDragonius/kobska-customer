import { gql } from '@apollo/client'

export type MemberTypes = 'Üzv' | 'Fəxri üzv' | 'Xüsusi üzv'
export type MemberProps = {
  id: string
  attributes: {
    name: string
    description: string
    date: string
    email: string
    phoneNumber: string
    address: string
    member_type: {
      data: {
        attributes: {
          type: MemberTypes
        }
      }
    }
    logo: {
      data: {
        attributes: {
          url: string
          alternativeText: string
          width: number
          height: number
        }
      }
    }
    links: {
      id: string
      url: string
      name: string
      icon: {
        data: {
          attributes: {
            name: string
            url: string
            width: number
            height: number
          }
        }
      }
    }[]
  }
}
export interface IMemberQuery {
  members: {
    data: [
      {
        id: string
        attributes: {
          name: string
          description: string
          date: string
          logo: {
            data: {
              attributes: {
                url: string
                alternativeText: string
                width: number
                height: number
              }
            }
          }
          member_type: {
            data: {
              attributes: {
                type: MemberTypes
              }
            }
          }
        }
      }
    ]
  }
}
export const MembersQuery = gql`
  query ($locale: I18NLocaleCode!) {
    members(locale: $locale, sort: "date:desc", pagination: { pageSize: 100 }) {
      data {
        id
        attributes {
          logo {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
          }
          name
          date
          description
          member_type {
            data {
              attributes {
                type
              }
            }
          }
        }
      }
    }
  }
`
