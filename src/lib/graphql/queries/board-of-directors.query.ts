import { gql } from '@apollo/client'
export type DirectorProps = {
  name: string
  position: string
  id: number
  image: {
    data: {
      attributes: {
        alternativeText: string
        url: string
        width: number
        height: number
      }
    }
  }
  address: string
  description: string
  email: string
  phoneNumber: string
  socialNetworks: {
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
export interface IBoardOfDirectorsQuery {
  boardOfDirector: {
    data: {
      attributes: {
        directors: DirectorProps[]
      }
    }
  }
}
export const BoardOfDirectorsQuery = gql`
  query ($locale: I18NLocaleCode!, $year: Int!) {
    boardOfDirector(locale: $locale) {
      data {
        attributes {
          directors(filters: { year: { eq: $year } }) {
            ... on ComponentAboutDirector {
              name
              position
              id
              description
              year
              address
              email
              phoneNumber
              socialNetworks {
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
              image {
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
`
