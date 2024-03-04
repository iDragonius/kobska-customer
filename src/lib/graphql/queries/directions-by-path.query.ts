import { gql } from '@apollo/client'

export interface IDirections {
  data: {
    attributes: {
      name: string
      path: string
      description: string
      cover: {
        data: {
          attributes: {
            url: string
            alternativeText: string
            width: number
            height: number
          }
        }
      }
      advantages: [
        {
          id: string
          title: string
          content: string
        }
      ]
    }
  }
}
export interface IDirectionsByPathQuery {
  directionType: IDirections
}
export const DirectionsByPathQuery = gql`
  query ($locale: I18NLocaleCode!, $path: String!) {
    directionType(locale: $locale, path: $path) {
      data {
        attributes {
          cover {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
          }
          advantages {
            id
            title
            content
          }
          description
          name
        }
      }
    }
  }
`
