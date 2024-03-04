import { gql } from '@apollo/client'

export interface IMembersBySectorQuery {
  memberSector: {
    data: {
      id: string
      attributes: {
        member: {
          data: [
            {
              id: string
              attributes: {
                name: string
                slug: string
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
              }
            }
          ]
        }
      }
    }
  }
}
export const MembersBySectorQuery = gql`
  query ($id: ID!, $locale: I18NLocaleCode!) {
    memberSector(locale: $locale, id: $id) {
      data {
        id
        attributes {
          members {
            data {
              id
              attributes {
                name
                slug
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
        }
      }
    }
  }
`
