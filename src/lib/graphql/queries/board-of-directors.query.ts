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
  query ($locale: I18NLocaleCode!) {
    boardOfDirector(locale: $locale) {
      data {
        attributes {
          directors {
            ... on ComponentAboutDirector {
              name
              position
              id
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
