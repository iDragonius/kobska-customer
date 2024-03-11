import { gql } from '@apollo/client'
import { MemberProps } from './members.query'

export interface IMemberByIdQuery {
  member: {
    data: MemberProps
  }
  members: {
    data: MemberProps[]
  }
}
export const MemberByIdQuery = gql`
  query ($id: ID!, $locale: I18NLocaleCode!) {
    member(id: $id, locale: $locale) {
      data {
        id
        attributes {
          name
          description
          date
          email
          phoneNumber
          address
          member_type {
            data {
              attributes {
                type
              }
            }
          }
          links {
            id
            url
            name
            icon {
              data {
                attributes {
                  url
                  name
                  width
                  height
                }
              }
            }
          }
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
        }
      }
    }
    members(
      locale: $locale
      filters: { id: { ne: $id } }
      sort: "date:desc"
      pagination: { page: 1, pageSize: 3 }
    ) {
      data {
        id
        attributes {
          name
          date
          description
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
