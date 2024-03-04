import { gql } from '@apollo/client'

export interface IHeadsAppealQuery {
  headSAppeal: {
    data: {
      attributes: {
        content: string
        full_name: string
        position: string
        image: {
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
  }
}
export const HeadsAppealQuery = gql`
  query ($locale: I18NLocaleCode!) {
    headSAppeal(locale: $locale) {
      data {
        attributes {
          content
          full_name
          position
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
`
